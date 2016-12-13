//import React from 'react';
//import { SearchAutoComplete } from './';
//
//let component;
//
//beforeEach(() => {  
//  component = mount(
//    <SearchAutoComplete
//      tracks={[
//        {
//          artist: "Radiohead",
//          name: "Just",
//          mbid: "some-mbid",
//          image: [
//            {
//              '#text': 'http://example.com/image.jpg',
//            } 
//          ]
//        }
//      ]}
//      artists={[{}]}
//      albums={[{}]}
//    />
//  );
//});
//
//describe.only('SearchAutoComplete component', () => {
//  it('renders the component if there is something to render', () => {
//    component.setProps(
//      {
//        tracks : [
//          {
//            artist: "Radiohead",
//            name: "Just",
//            mbid: "some-mbid",
//            image: [
//              {
//                '#text': 'http://example.com/image.jpg',
//              } 
//            ]
//          }
//        ]
//      }
//    );
//    expect(component.find('.autocomplete')).to.be.present();
//  });
//});
