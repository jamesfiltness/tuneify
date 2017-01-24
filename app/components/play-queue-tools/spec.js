import React from 'react';
import { PlayQueueTools } from './';
import sinon from 'sinon';

let component;

beforeEach(() => { 
  component = shallow(
    <PlayQueueTools />
  );
});

describe.only('PlayQueueTools component', () => {
  it('renders the wrapping ul', () => {
    expect(component.find('.play-queue-tools')).to.be.present();   
  });
  
  it('renders the save button', () => {
    expect(component.find('.play-queue-tools__tool.fa-save')).to.be.present();   
  });
  
  it('renders the repeat button with the correct classes', () => {
    expect(component.find('.play-queue-tools__tool.fa.fa-repeat')).to.be.present();   
  });

  it('render the repeat button with an off class if repeat is not passed as a prop', () => {
    expect(
      component.find('.play-queue-tools__repeat'))
        .to.have.className('play-queue-tools__repeat--off');
  });

  it('render the repeat button with an off class if repeat is not passed as a prop', () => {
    component = shallow(
      <PlayQueueTools repeat />
    );

    expect(
      component.find('.play-queue-tools__repeat'))
        .to.have.className('play-queue-tools__repeat--on');
  });

  it('render the shuffle button with an off class if shuffle is not passed as a prop', () => {
    expect(
      component.find('.play-queue-tools__shuffle'))
        .to.have.className('play-queue-tools__shuffle--off');
  });

  it('render the shuffle button with an on class if shuffle is passed as a prop', () => {
    component = shallow(
      <PlayQueueTools shuffle />
    );

    expect(
      component.find('.play-queue-tools__shuffle'))
        .to.have.className('play-queue-tools__shuffle--on');
  });

  it('calls the onTrashPlayQueue callback when trash button is clicked on', () => {
    const callback = sinon.spy();

    component = shallow(
      <PlayQueueTools
        onTrashPlayQueue={callback}
      />
    );
    
    const trash = component.find('.fa-trash');
    trash.simulate('click');
    expect(callback).to.have.been.called;
  });

  it('calls the onShuffle prop when the shuffle button is clicked on', () => {
    const callback = sinon.spy();
    
    component = shallow(
      <PlayQueueTools
        onShuffle={callback}
      />
    );
    
    const shuffle = component.find('.play-queue-tools__shuffle');
    shuffle.simulate('click');
    // shuffle isn't called with any args
    expect(callback).to.have.been.called;
  });
  
  it('calls the onRepeat prop when the repeat button is clicked  on', () => {
    const callback = sinon.spy();
    
    component = shallow(
      <PlayQueueTools
        onRepeat={callback}
      />
    );
    
    const repeat = component.find('.play-queue-tools__repeat');
    repeat.simulate('click');
    // shuffle isn't called with any args
    expect(callback).to.have.been.called;
  });
 }); 
