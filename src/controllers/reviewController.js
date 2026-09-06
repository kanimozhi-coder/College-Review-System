import ReviewModel from "../models/review.js";
import CollegeModel from "../models/college.js";
import UserModel from "../models/user.js";

export const createReview = async (req, res) => {
  try {
    const collegeExists = await CollegeModel.findById(req.body.college);

    if (!collegeExists) {
      return res.status(404).json({
        message: "College not found",
      });
    }

    const review = await ReviewModel.create({
      college: req.body.college,
      user: req.user.userId,
      rating: req.body.rating,
      comment: req.body.comment,
    });

    res.status(201).json({
      success: true,
      message: "Review created successfully",
      review,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getReviews = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;

    const skip = (page - 1) * limit;

    const search = req.query.search || "";

    console.log("Search", search);

    const filter = {
      comment: {
        $regex: search,
        $options: "i",
      },
    };

    const reviews = await ReviewModel.find().populate("user", "name email").populate("college", "name").skip(skip).limit(limit).sort({ createdAt: -1 });

    const totalReviews = await ReviewModel.countDocuments(filter);

    res.status(200).json({
      success: true,
      message: "Get reviews successful",
      reviews,
      currentPage: page,
      totalPages: Math.ceil(totalReviews / limit),
      totalReviews,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getReview = async (req, res) => {
  try {
    const review = await ReviewModel.findById(req.params.id).populate("user", "name email").populate("college", "name");

    if (!review) {
      return res.status(404).json({
        message: "Review not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Get single review successful",
      review,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateReview = async (req, res) => {
  try {
    const review = await ReviewModel.findById(req.params.id);

    console.log("review", review);

    if (!review) {
      return res.status(404).json({
        message: "Review not found",
      });
    }

    if (review.user.toString() !== req.user.userId) {
      return res.status(403).json({
        message: "You can only update your own review",
      });
    }

    review.rating = req.body.rating ?? review.rating;
    review.comment = req.body.comment ?? review.comment;

    await review.save();

    res.status(200).json({
      success: true,
      message: "Update review successful",
      review,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteReview = async (req, res) => {
  try {
    const review = await ReviewModel.findById(req.params.id);

    if (!review) {
      return res.status(404).json({
        message: "Review not found",
      });
    }

    // if (review.user.toString() !== req.user.userId) {
    //   return res.status(403).json({
    //     message: "You can only delete your own review",
    //   });
    // }

    await ReviewModel.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Review deleted successfully",
    });
  } catch (error) {
    console.log(error);
  }
};
