import express from 'express';
import { promises } from 'fs';

/**
 * exporta una funcion asincronica, la cual retorna una promesa, con todos los testimonios disponiilizados.    
 * @returns Promise
 *
 */
export async function allTestimonials(){
    return promises.readFile('./data/testimonials.json')
        .then(function(data){
            const testimonials = JSON.parse(data.toString())
            return testimonials.filter(function(testimonial){
                return testimonial.deleted != true
            })
        })
        .catch(function(err){
            return err
        })
} 

export default {
    allTestimonials
}