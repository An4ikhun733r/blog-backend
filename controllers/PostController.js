import PostModel from "../models/Post.js";

export const getLastTags = async (req, res) => {
  try {
    const posts = await PostModel.find().limit(5).exec();

    const tags = posts
      .map((obj) => obj.tags)
      .flat()
      .slice(0, 5);

    res.json(tags);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Unable to get tags",
    });
  }
};

export const getAll = async (req, res) => {
  try {
    const posts = await PostModel.find().populate("user").exec();

    res.json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Unable to get posts",
    });
  }
};

export const getOne = async (req, res) => {
  try {
    const postId = req.params.id;
    // Update the document
    await PostModel.findOneAndUpdate(
      { _id: postId },
      { $inc: { viewsCount: 1 } }
    );

    // Retrieve the updated document and populate the 'user' field
    const post = await PostModel.findOne({ _id: postId }).populate("user");
    res.json(post);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Unable to get post",
    });
  }
};


export const remove = (req, res) => {
  try {
    const postId = req.params.id;
    PostModel.findOneAndDelete({
      _id: postId,
    })
      .then(() => res.json({ success: true }))
      .catch((err) =>
        res.status(500).json({ message: "Unable to delete post" })
      );
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Unable to get post",
    });
  }
};

export const create = async (req, res) => {
  try {
    const doc = new PostModel({
      title: req.body.title,
      text: req.body.text,
      imageUrl: req.body.imageUrl,
      tags: req.body.tags,
      user: req.userId,
    });

    const post = await doc.save();
    console.log("req body", req.body);
    res.json(post);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Unable to create post",
    });
  }
};

export const update = async (req, res) => {
  try {
    const postId = req.params.id;
    await PostModel.updateOne(
      {
        _id: postId,
      },
      {
        title: req.body.title,
        text: req.body.text,
        imageUrl: req.body.imageUrl,
        tags: req.body.tags,
        user: req.userId,
      }
    );

    res.json({
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Unable to update",
    });
  }
};
