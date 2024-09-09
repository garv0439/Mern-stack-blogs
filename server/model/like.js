// model/like.js
import mongoose from 'mongoose';

const LikeSchema = mongoose.Schema({
    postId: {
        type: String,
        required: true,
    }
});

const Like = mongoose.model('Like', LikeSchema);

export default Like;
