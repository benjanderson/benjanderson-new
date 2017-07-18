import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.scss']
})
export class AboutMeComponent implements OnInit {

  public history = [
    {
      title: 'Health Catalyst',
      subtitle: 'Senior Software Engineer',
      description: `Led team of 3 engineers and 1 quality assurance to build enterprise web application. 
      Built with Angular, asp.net, c#, and sql server.`,
      date: 'Oct 2014 - Present',
      icon: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/148866/cd-icon-picture.svg'
    },
    {
      title: 'eForce Software',
      subtitle: 'Software Architect',
      description: `Plan and Oversee overall software structure and maintain code quality`,
      date: 'Aug 2012 - Oct 2014',
      icon: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/148866/cd-icon-picture.svg'
    },
    {
      title: 'eForce Software',
      subtitle: 'Software Engineer',
      description: `Design and maintain web based law enforcement software for clients around the US`,
      date: 'Mar 2007 - Aug 2012',
      icon: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/148866/cd-icon-picture.svg'
    },
    {
      title: 'Utah State University',
      subtitle: 'Bachelor of Science (BS), Computer Science',
      description: ``,
      date: '2003 - 2010',
      icon: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/148866/cd-icon-picture.svg'
    },
  ];

  public currentYear = new Date().getFullYear();

  constructor() { }

  ngOnInit() {
  }

}
