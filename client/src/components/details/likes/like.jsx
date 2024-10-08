import { useState, useEffect, useContext } from 'react';
import { Box, styled } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { API } from '../../../service/api';
import { DataContext } from "../../../context/DataProvider";

const FavoriteBorder = styled(FavoriteBorderIcon)`
    margin: 5px;
    padding: 5px;
    border: 1px solid #878787;
    border-radius: 10px;
    cursor: pointer;
`;

const Favorite = styled(FavoriteIcon)`
    margin: 5px;
    padding: 5px;
    border: 1px solid #878787;
    border-radius: 10px;
    cursor: pointer;
`;

const LikeButton = ({ postId }) => {
    const { account } = useContext(DataContext);
    const [liked, setLiked] = useState(false);
    const [likesCount, setLikesCount] = useState(0);
    const [loading, setLoading] = useState(false); // Prevent multiple clicks during API call

    // Fetch the like status when the component mounts or when postId changes
    useEffect(() => {
        const fetchLikeStatus = async () => {
            if (!postId || !account) {
                console.error("postId or account is undefined");
                return;
            }
            try {
                const response = await API.checkIfLiked({ postId: String(postId), name: account.username });

                if (response?.isSuccess) {
                    setLikesCount(response.data.count || 0);
                    setLiked(response.data.liked); // Update the liked state
                }
            } catch (error) {
                console.error("Failed to fetch like status:", error);
            }
        };

        // Fetch like status if the account is available
        if (postId && account?.username) {
            fetchLikeStatus();
        }
    }, [postId, account]);

    const handleLike = async () => {
        if (loading) return; // Prevent further actions while API is in progress

        setLoading(true); // Set loading state to prevent multiple clicks

        try {
            if (!postId || !account) {
                console.error("postId or account is undefined");
                return;
            }

            const payload = { postId: String(postId), name: account.username };

            if (liked) {
                await API.unlikePost(payload); // Unlike the post
                setLikesCount(likesCount - 1); // Decrease the count
            } else {
                await API.likePost(payload); // Like the post
                setLikesCount(likesCount + 1); // Increase the count
            }

            setLiked(!liked); // Toggle the like state
        } catch (error) {
            console.error("Failed to toggle like:", error);
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    return (
        <Box display="flex" alignItems="center">
            {liked ? (
                <Favorite onClick={handleLike} color="error" />
            ) : (
                <FavoriteBorder onClick={handleLike} color="action" />
            )}
            <span>{likesCount} likes</span>
        </Box>
    );
};

export default LikeButton;
