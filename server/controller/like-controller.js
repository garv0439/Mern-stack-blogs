import Like from '../model/like.js';

// Add a new like to the post
export const addLike = async (request, response) => {
    try {
        const { likeId } = request.body;

        if (!likeId || typeof likeId !== 'string') {
            return response.status(400).json({ message: "likeId is required and must be a string." });
        }

        const newLike = new Like({ likeId });
        await newLike.save();

        response.status(200).json('Post liked successfully');
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
};

// Remove a like from a post
export const removeLike = async (request, response) => {
    try {
        const { likeId } = request.body;

        // Ensure likeId is a string and find like by likeId
        const like = await Like.findOneAndDelete({ likeId: String(likeId) });
        if (!like) {
            return response.status(404).json({ message: "Like not found" });
        }

        response.status(200).json('Post unliked successfully');
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
};


