import Like from '../model/like.js';

// Add or remove a like to/from the post
export const addLike = async (request, response) => {
    try {
        const { postId, name } = request.body; // Include postId and name

        if (!postId || !name) {
            return response.status(400).json({ message: "postId and name are required." });
        }

        // Check if the user has already liked this post
        const existingLike = await Like.findOne({ postId, name });

        if (existingLike) {
            // If the like exists, remove it
            await Like.findOneAndDelete({ postId, name });
            return response.status(200).json('Post unliked successfully');
        } else {
            // If the like does not exist, add a new like
            const newLike = new Like({ postId, name });
            await newLike.save();
            return response.status(200).json('Post liked successfully');
        }
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
};

// Remove a like from a post
export const removeLike = async (request, response) => {
    try {
        const { postId, name } = request.body; // Include postId and name

        if (!postId || !name) {
            return response.status(400).json({ message: "postId and name are required." });
        }

        // Find and delete the like
        const like = await Like.findOneAndDelete({ postId, name });
        if (!like) {
            return response.status(404).json({ message: "Like not found" });
        }

        response.status(200).json('Post unliked successfully');
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
};

// Check if the user has already liked a post
export const checkIfLiked = async (request, response) => {
    try {
        const { postId, name } = request.query; // Use query parameters for checking

        if (!postId || !name) {
            return response.status(400).json({ message: "postId and name are required." });
        }

        // Check if the like exists
        const existingLike = await Like.findOne({ postId, name });

        if (existingLike) {
            return response.status(200).json({ liked: true, count: await Like.countDocuments({ postId }) });
        } else {
            return response.status(200).json({ liked: false, count: await Like.countDocuments({ postId }) });
        }
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
};
