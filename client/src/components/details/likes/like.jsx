import { useState, useEffect } from 'react';
import { Box, styled } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { API } from '../../../service/api';

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

const LikeButton = ({ likeId }) => {
    const [liked, setLiked] = useState(false);
    const [likesCount, setLikesCount] = useState(0);

    
        useEffect(() => {
        
        const fetchLikesCount = async () => {
            try {
                const response = await API.getLikes({ likeId: String(likeId) });
                setLikesCount(response.data.count || 0);
                setLiked(response.data.liked || false); 
            } catch (error) {
                console.error("Failed to fetch likes count:", error);
            }
        };

        fetchLikesCount();
    }, [likeId]);

    const handleLike = async () => {
        try {
            if (liked) {
                await API.unlikePost({ likeId: String(likeId) });
                setLikesCount(likesCount - 1);
            } else {
                await API.likePost({ likeId: String(likeId) });
                setLikesCount(likesCount + 1);
            }
            setLiked(!liked);
        } catch (error) {
            console.error("Failed to toggle like:", error);
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
