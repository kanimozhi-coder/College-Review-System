import CollegeModel from "../models/college.js";

export const getColleges = async (req, res) => {
  try {
    const colleges = await CollegeModel.find({});

    res.status(200).json({
      success: true,
      message: "fetch colleges successfully",
      numberOfColleges: colleges.length,
      colleges,
    });
  } catch (error) {
    console.log(error);
  }
};

export const createCollege = async function (req, res) {
  try {
    console.log(req);

    const existingCollege = await CollegeModel.findOne({ name: req.body.name });

    console.log("existingCollege", existingCollege);

    if (existingCollege) {
      return res.status(404).json({
        success: false,
        message: "college already exists",
      });
    }

    const college = await CollegeModel.create(req.body);

    res.status(201).json({
      success: true,
      message: "college created successfully",
      college,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getSingleCollege = async function (req, res) {
  try {
    console.log(req.params.id);

    const college = await CollegeModel.findById(req.params.id);

    if (!college) {
      return res.status(404).json({
        success: false,
        message: "college not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "college gets successfully",
      college,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateCollege = async function (req, res) {
  try {
    const college = await CollegeModel.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

    if (!college) {
      return res.status(404).json({
        success: false,
        message: "college not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "college updated successfully",
      updatedCollege: college,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteCollege = async function (req, res) {
  try {
    const college = await CollegeModel.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "college deleted successfully",
      deletedCollege: college,
    });
  } catch (error) {
    console.log(error);
  }
};
