import { promises } from "fs";
import repository from "../repositories/testimonialsRepository.js";

function viewAll(req, res) {
  repository.allTestimonials().then(function (testimonials) {
    res
      .render("list-testimonials", {
        all: testimonials,
      })
      .catch(function (err) {
        res.status(500).json({ err: 500, msg: err.message });
      });
  });
}

export function formNewTestimonial(req, res) {
  res.render("formNewTestimonial", {});
}
export function createTestimonial(req, res) {
  repository
    .create(req.body)
    .then(function (entity) {
      res.render("testimonial", entity);
    })
    .catch(function (err) {
      res.status(500).send(err.message);
    });
}
function view(req, res) {
  res.render("index");
}

export default {
  view,
  viewAll,
  createTestimonial,
  formNewTestimonial,
};
