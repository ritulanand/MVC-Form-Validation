//hoisted declaration
import { body, validationResult } from "express-validator";

const validateRequest = async (req, res, next) => {
  // validate data
  ///1. setup rules for validation
  console.log("req", req.body);
  const rules = [
    body("name").notEmpty().withMessage("Name is required"),
    body("price")
      .isFloat({ gt: 0 })
      .withMessage("Price should be aa positive value"),
    // body('imageUrl').isURL().withMessage('Invalid URL')
    body("imageUrl").custom((value, { req }) => {
      if (!req.file) {
        throw new Error("Image is required");
      }
      return true;
    }),
  ];

  //2 run those rules

  await Promise.all(rules.map((rule) => rule.run(req)));
  //3 check if there are any error after running rules
  var validationErrors = validationResult(req);
  console.log("val", validationErrors);

  // 4 if errors  return error message
  if (!validationErrors.isEmpty()) {
    return res.render("new-product", {
      errorMessage: validationErrors.array()[0].msg,
    });
  }

  next();
};

export default validateRequest;
