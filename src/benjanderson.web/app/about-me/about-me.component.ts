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
      description: ['Led team of 5 to successful completion of project.', 'Part of architecture leadership',
        'Interviewed new candidates applying for the larger development team', 'Active team lead in Scrum/Agile process'],
      date: 'Oct 2014 - Present',
      icon: 'http://files.benjaminjanderson.com/benjaminjandersonblob/cd-icon-healthcatalyst.png',
      class: 'cd-hc',
      projects: [
        {
          title: 'Atlas',
          description: 'Senior Engineering role in web based index of Data Warehouse. ' +
          'Led design of project setup of webpack and development/test environments',
          tags: ['Angular', 'ASP.net', 'C#', 'webpack', 'karma']
        },
        {
          title: 'Instant Data Entry Application (IDEA)',
          description: 'Led team of 4 developers and 1 quality assurance engineer for over a year to successful ' +
          'completion of web based data management  tool',
          tags: ['AngularJs', 'ASP.net', 'C#', 'Sql Server', 'jasmine']
        },
      ]
    },
    {
      title: 'eForce Software',
      subtitle: 'Software Architect',
      description: ['Oversaw all software architectural and design decisions',
      'Led in choosing software technology framework, technologies, testing, code organization, and code styling standards. ',
      'Established SOLID design principles in team of 8 developers.'],
      date: 'Aug 2012 - Oct 2014',
      icon: 'http://files.benjaminjanderson.com/benjaminjandersonblob/cd-icon-eforce.png',
      class: 'cd-eforce',
      tags: [],
      projects: [
        {
          title: 'Cloud Web Service/Sync Solution ',
          description: 'Led project to create scalable solution to centralize customer data. ' +
          'Synced dispatch and record data through secure WCF services',
          tags: ['WCF', 'ASP.net', 'C#', 'Entity Framework', 'Sql Server']
        },
        {
          title: 'IOS and Android Mobile Applications',
          description: 'Independently developed IOS/Android application to improve officer safety and record keeping. ' + 
          'Used modern technology to create an interoperable and scalable application.',
          tags: ['Web Services', 'ASP.net', 'C#', 'Xamarin', 'IOS', 'Android']
        },
      ]
    },
    {
      title: 'eForce Software',
      subtitle: 'Software Engineer',
      description: ['Designed and maintained web based law enforcement software for clients around the US'],
      date: 'Mar 2007 - Aug 2012',
      icon: 'http://files.benjaminjanderson.com/benjaminjandersonblob/cd-icon-eforce.png',
      class: 'cd-eforce',
      tags: [],
      projects: [
        {
          title: 'Interface Exchange Service',
          description: 'Sole designer of windows service to dynamically load and run modules ' +
          'that interface with 3rd party vendors. Developed web front-end to remotely configure and debug; ' +
          'this improved customer support and significantly decreased development time.',
          tags: ['C#', 'Windows Services']
        },
        {
          title: 'Ad-Hoc Reporting',
          description: 'Principal designer over project used to dynamically pull data from server and present reports to customer. ' +
          'Used web services bound to Knockout JS templates. ',
          tags: ['Sql Server', 'Knockout JS', 'ASP.net', 'C#']
        },
      ]
    },
    {
      title: 'Utah State University',
      subtitle: 'Bachelor of Science (BS), Computer Science',
      description: [],
      date: '2003 - 2010',
      icon: 'http://files.benjaminjanderson.com/benjaminjandersonblob/cd-icon-usu.png',
      class: 'cd-usu',
      tags: [],
    },
  ];

  public currentYear = new Date().getFullYear();

  constructor() { }

  ngOnInit() {
  }

}
