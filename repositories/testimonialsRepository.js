import express from "express";
import { promises } from "fs";

/**
 * exporta una funcion asincronica, la cual retorna una promesa, con todos los testimonios disponiilizados.
 * @returns Promise
 *
 */
export async function allTestimonials() {
  return promises
    .readFile("./data/testimonials.json")
    .then(function (data) {
      const testimonials = JSON.parse(data.toString());
      return testimonials.filter(function (testimonial) {
        return testimonial.deleted != true && testimonial.web == true;
      });
    })
    .catch(function (err) {
      return err;
    });
}
/**
 * exporta una funcion asincronica, la cual retorna una promesa, con un post del testimonio.
 * @returns Promise
 *
 */
export async function create(entity) {
  return promises
    .readFile("./data/testimonials.json")
    .then(function (data) {
      const testimonials = JSON.parse(data.toString());

      entity.id = testimonials.length + 1;

      testimonials.push(entity);

      return promises.writeFile(
        "./data/testimonials.json",
        JSON.stringify(testimonials)
      );
    }) //solo en caso que la promesa anterior haya retornado exitosamente e, ejecutará la siguiente funcion que retorna el entity
    .then(function () {
      return entity;
    })
    .catch(function (err) {
      return err;
    });
}

export default {
  allTestimonials,
  create,
};
