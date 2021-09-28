import express from "express";
import { promises } from "fs";
import repository from "../repositories/testimonialsRepository.js";

const router = express.Router();
/**
 * Middleware que actua como una capa de seguridad
 * cuando se le pide al controlador que ejecute una accion
 * que requiere permisos (metodo delete, patch)
 * 
 * @param req 
 * @param res 
 * @param next 
 */
function mw_permission(req, res, next) {
  if (req.query.pass === "123") {
    next();
  } else {
    res
      .status(401)
      .json({ err: 401, msg: "No posee los permisos suficientes" });
  }
}
router.route("/").get(function (req, res) {
  repository
    .allTestimonials()
    .then(function (data) {
      res.status(200).json(data);
    })
    .catch(function (err) {
      res.status(400).json({ err: 500, msg: err.message });
    });
});

router
  .route("/:id")
  .delete([mw_permission], function (req, res) {
    promises
      .readFile("./data/testimonials.json")
      .then(function (data) {
        const testimonials = JSON.parse(data.toString());
        const testimonial = testimonials.find(function (t) {
          return t.id == req.params.id;
        });
        if (testimonial) {
          testimonial.deleted = true;

          promises
            .writeFile("./data/testimonials.json", JSON.stringify(testimonials))
            .then(function () {
              res.status(200).json(testimonial);
            });
        }
      })
      .catch(function (err) {
        res.status(404).json({
          err: 404,
          msg: `no se encuentra el testimonio id: ${req.params.id}`,
        });
      });
  })
  .patch([mw_permission],function (req, res) {
    promises
      .readFile("./data/testimonials.json")
      .then(function (data) {
        const testimonials = JSON.parse(data.toString());
        let testimonial = testimonials.find(function (t) {
          return t.id == req.params.id;
        });

        if (testimonial) {
          const index = testimonials.indexOf(testimonial);
          testimonials[index] = {
            ...testimonials[index],
            ...req.body,  
            id: testimonial.id,
          };

          promises
            .writeFile("./data/testimonials.json", JSON.stringify(testimonials))
            .then(function () {
              res.status(200).json(testimonials[index]);
            });
        } else {
          res.status(404).json({
            err: 404,
            msg: `No se encuentra el testimonio #${req.params.id}`,
          });
        }
      })
      .catch(function (err) {
        res.status(500);
        res.json({ err: 500, msg: err.message });
      });
  })
  .get(function (req, res) {
    promises
      .readFile("./data/testimonials.json")
      .then(function (data) {
        const tstParsed = JSON.parse(data.toString());
        const tst = tstParsed.find(function (t) {
          return t.id == req.params.id;
        });

        if (tst) {
          if (tst.deleted != true) {
            res.status(200).json(tst);
          } else {
            res.status(404).json({
              err: 404,
              msg: `El testimonio #${req.params.id} fue eliminado.`,
            });
          }
        } else {
          res.status(404).json({
            err: 404,
            msg: `No se encuentra el testimonio #${req.params.id}`,
          });
        }
      })
      .catch(function (err) {
        res.status(500);
        res.json({ err: 500, msg: err.message });
      });
  });

export default router;
