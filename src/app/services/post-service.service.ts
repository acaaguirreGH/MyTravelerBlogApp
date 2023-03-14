import { Injectable } from '@angular/core';
import { BehaviorSubject, count, Observable, of } from 'rxjs';
import { PostModel, postState } from '../Models/post';
import { createApi } from 'unsplash-js';
import { ICategory } from '../Models/icategory';
import { Guid } from 'typescript-guid';
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

  private addPostSource = new BehaviorSubject<string>('false');
  public addPost = this.addPostSource.asObservable();    

  constructor() {
    //Subscribe for changes so the UI gets refreshed with the new posts
    this.addPost.subscribe();
   }

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

  GenerateGUID() {    
    let id: { object: string; value: string; }  = Guid.create() as unknown as  { object: string; value: string; };
    return id.value;
  }
  GetPosts(): Observable<PostModel[]> {
    this.existingPosts = [];
    let postsCache = localStorage.getItem('1');
   
    if (postsCache !== undefined && postsCache != null && postsCache.length > 0) {
    let r: PostModel[] = JSON.parse(postsCache!);
    this.existingPosts = r;
    }
    else {
      this.existingPosts.push(
        {
        id: this.GenerateGUID(),
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
        id: this.GenerateGUID(),
        title : 'Camilo',
        description : 'Escuchar musica',
        imageUrl : undefined,
        category : 'Lifestyle',
        state : postState.Existing
      });
      this.existingPosts.push(
      {
        id: this.GenerateGUID(),
        title : 'Divisas.',
        description : 'Dolar pierde contra el peso.',
        imageUrl : undefined,
        category : 'Business',
        state : postState.Existing
      });
      this.existingPosts.push(
      {
        id: this.GenerateGUID(),
        title : 'LA',
        description : 'No se puede viajar a LA.',
        imageUrl : undefined,
        category : 'Travel',
        state : postState.Existing
      });
    }
    return of(this.existingPosts);
  }

  getURLs() {

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
                counter++;
                var url = 'url('+'\'' + result.response.results[counter].urls.regular + ''+'\)';
                r.imageUrl = url;                
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

  async getSingleURL(category: string): Promise<string> {
    let url = "";
    try {      

           let counter = 0;
              this.existingPosts.forEach(r => {
                if(r.category === category) {
                  counter++;
                }
              });

          await this.unsplashApi.search.getPhotos(
            {
              query: category,
              page: 1,
              perPage: counter + 1,
              orderBy: 'latest',
              contentFilter: 'low'
            })
            .then(async result => {
            if (result.errors) {
              // handle error here
              console.log('error occurred: ', result.errors[0]);
              return url;
            } else {              
              url = 'url('+'\'' + result.response.results[counter].urls.regular + ''+'\)';            
            }
            return url;
          });
          return url;
    }
    catch (error) {
      console.log(error);
      return "";
    }
  }

  async savePost(data: PostModel): Promise<Observable<string>> {
    if (data != null) {
        let postsCache = localStorage.getItem('1');
        let postArray : PostModel[];
        let postArrayF: PostModel[];
        let lastId: number;
        if (postsCache !== undefined) {
        let r: PostModel[] = JSON.parse(postsCache!);
        postArray = r;
        postArrayF = postArray;
        lastId = postArray.length;

        if(data.state == postState.Modified){

          let indexUpdate = postArray.findIndex(x => x.id == data.id);          
          postArray.forEach(element => {
            if (element.id == data.id) {
              if (element.category != data.category) {
                this.getSingleURL(data.category).then(res => {
                  data.imageUrl = res;
                });
              }
              postArray[indexUpdate] =  data;
            }


          });

          postArray = postArray;
        }
        this.existingPosts = postArray; 

        if (postArray !== undefined) {
          if(data.state == postState.Added)
          {
            lastId = lastId + 1;
            postArray.push(
              {id: data.id = this.GenerateGUID(), title: data.title, description: data.description, category: data.category, state: data.state, imageUrl: data.imageUrl ? 'url(' + data.imageUrl + ')' : await this.getSingleURL(data.category)});         
          }
            localStorage.setItem( '1', JSON.stringify(postArray));
            this.addPostSource.next(JSON.stringify(postArray));
            this.existingPosts = postArray;
            if(postArray.length === 0 && postArrayF.length > 0) {
              postArray = postArrayF;
            }    
          }
        }
    }
    return this.addPost;
    }
}
