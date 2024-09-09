import Like from '../model/like.js';

// Add a new like to the post
export const addLike = async (request, response) => {
    try {
        const { postId } = request.body;

        if (!postId || typeof postId !== 'string') {
            return response.status(400).json({ message: "postId is required and must be a string." });
        }

        const newLike = new Like({ postId });
        await newLike.save();

        response.status(200).json('Post liked successfully');
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
};

// Remove a like from a post
export const removeLike = async (request, response) => {
    try {
        const { postId } = request.body;

        // Ensure postId is a string and find like by postId
        const like = await Like.findOneAndDelete({ postId: String(postId) });
        if (!like) {
            return response.status(404).json({ message: "Like not found" });
        }

        response.status(200).json('Post unliked successfully');
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
};

// Get the total number of likes for a post
export const getLikesCount = async (request, response) => {
    try {
        const { postId } = request.body;

        if (!postId || typeof postId !== 'string') {
            return response.status(400).json({ message: "postId is required and must be a string." });
        }

        const likesCount = await Like.countDocuments({ postId });
        response.status(200).json({ count: likesCount });
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
};
