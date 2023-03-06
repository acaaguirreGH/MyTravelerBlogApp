import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PostModel, postState } from '../Models/post';
import { createApi } from 'unsplash-js';
@Injectable({
  providedIn: 'root'
})
export class PostService {

  existingPosts: PostModel[];
  categories: { key: string; value: string; }[];
  postComments: { author: string; comment: string; }[];
  base :  'https://source.unsplash.com/';
  unsplashApi = createApi({
    accessKey: 'JxTV9Lriy4vflMjdekklqBnq-ODL0aZP9omvh8Jg3mE'

       });
  constructor() { }

  GetCategories() {
    return this.categories = [
      {key: 'AllKey', value: 'All'},
      {key: 'TravelKey', value: 'Travel'},
      {key: 'LifestyleKey', value: 'Lifestyle'},
      {key: 'BusinessKey', value: 'Business'},
      {key: 'FoodKey', value: 'Food'},
      {key: 'WorkKey', value: 'Work'}
    ];
  }

  GetPosts(): Observable<PostModel[]> {
    this.existingPosts = [];
    this.existingPosts.push(
      {
      id: 1,
      title : 'Cancun',
      description : 'The best beach to vacation.',
      imageUrl : undefined,
      category : 'Travel',
      comments : this.postComments = [{ author: 'Aldo',  comment: 'A beach is a landform' +
      'alongside a body of water which consists of loose particles. The particles composing a' +
       'beach are typically made from rock, such as sand, gravel, shingle, pebbles, etc, or biological' +
       'sources, such as mollusc shells or coralline algae. Sediments settle in different densities and' +
       'structures, depending on the local wave action and weather, creating different textures, colors' +
        'and gradients or layers of material.' },
        { author: 'Aldo',  comment: 'A beach is a landform' +
        'alongside a body of water which consists of loose particles. The particles composing a' +
         'beach are typically made from rock, such as sand, gravel, shingle, pebbles, etc, or biological' +
         'sources, such as mollusc shells or coralline algae. Sediments settle in different densities and' +
         'structures, depending on the local wave action and weather, creating different textures, colors' +
          'and gradients or layers of material.' },
          { author: 'Aldo',  comment: 'A beach is a landform' +
          'alongside a body of water which consists of loose particles. The particles composing a' +
           'beach are typically made from rock, such as sand, gravel, shingle, pebbles, etc, or biological' +
           'sources, such as mollusc shells or coralline algae. Sediments settle in different densities and' +
           'structures, depending on the local wave action and weather, creating different textures, colors' +
            'and gradients or layers of material.' },{ author: 'Aldo',  comment: 'A beach is a landform' +
            'alongside a body of water which consists of loose particles. The particles composing a' +
             'beach are typically made from rock, such as sand, gravel, shingle, pebbles, etc, or biological' +
             'sources, such as mollusc shells or coralline algae. Sediments settle in different densities and' +
             'structures, depending on the local wave action and weather, creating different textures, colors' +
              'and gradients or layers of material.' }],
              state : postState.Existing
    });
    this.existingPosts.push(
    {
      id: 2,
      title : 'Camilo',
      description : 'Escuchar musica',
      imageUrl : undefined,
      category : 'Lifestyle',
      state : postState.Existing
    });
    this.existingPosts.push(
    {
      id: 3,
      title : 'Divisas.',
      description : 'Dolar pierde contra el peso.',
      imageUrl : undefined,
      category : 'Business',
      state : postState.Existing
    });
    this.existingPosts.push(
    {
      id: 4,
      title : 'LA',
      description : 'No se puede viajar a LA.',
      imageUrl : undefined,
      category : 'Travel',
      state : postState.Existing
    });
    return of(this.existingPosts);
  }

  getUrl() {

   try {

    this.existingPosts.forEach(x => {
      if(x.imageUrl === undefined || x.imageUrl === '') {
        this.unsplashApi.search.getPhotos(
          {
            query: x.category,
            page: 1,
            perPage: 5
          })
          .then(result => {
          if (result.errors) {
            // handle error here
            console.log('error occurred: ', result.errors[0]);
          } else {
            let counter = 0;
            this.existingPosts.forEach(r => {
              if(r.category === x.category) {
                var url = 'url('+'\'' + result.response.results[counter].urls.regular + ''+'\)';
                r.imageUrl = url;
                counter++;
              }
            });
            localStorage.setItem('1', JSON.stringify(this.existingPosts));
          }
        });
      }


      });
}
catch (error) {
console.log(error);

}
}
}
