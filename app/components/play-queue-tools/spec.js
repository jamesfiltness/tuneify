import React from 'react';
import { PlayQueueTools } from './';

  let component;
  
  beforeEach(() => {
    component = shallow(
      <PlayQueueTools />
    );

  });

  describe('PlayQueueTools component', () => {
    it('renders the wrapping ul', () => {
      expect(component.find('.play-queue-tools')).to.be.present();   
    });
    
    it('renders the save button', () => {
      expect(component.find('.play-queue-tools__tool.fa-save')).to.be.present();   
    });
    
    it('renders the repeat button with the correct classes', () => {
      expect(component.find('.play-queue-tools__tool.fa-save')).to.be.present();   
    });
  });

  //const pageNotFound = shallow(<PageNotFound />);
  //    <ul className="play-queue-tools">
  //      <li className="play-queue-tools__tool fa fa-save"></li>
  //      <li 
  //        className={repeatClasses}
  //        onClick={this.repeat}
  //      ></li>
  //      <li 
  //        className={shuffleClasses}
  //        onClick={this.shuffle}
  //      ></li>
  //      <li 
  //        className="play-queue-tools__tool fa fa-trash"
  //        onClick={this.trashPlayQueue}
  //      >
  //      </li>
  //    </ul>
