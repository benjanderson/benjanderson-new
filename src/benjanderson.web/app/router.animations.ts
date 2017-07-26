
import { trigger, animate, style, group, animateChild, query, stagger, transition, sequence, state } from '@angular/animations';

export const routerTransition =
    trigger('routerTransition', [
        transition('home => about-me, about-me => color-test, home => color-test', [
            query(':enter, :leave', style({ position: 'fixed', width: '100%' }), { optional: true }),
            sequence([
                group([
                    query(':enter', [
                        style({ transform: 'translateX(100%)' }),
                    ], { optional: true }),
                    query(':leave', [
                        style({ transform: 'translateX(0%)' }),
                    ], { optional: true })
                ]),
                style({ 'opacity': '1', 'background-url': 'none' }),
                query('.footer,#content', animate('0.1s ease-in-out', style({ 'opacity': '0.2' }))),
                query('.footer', style({ 'visibility': 'collapse' })),
                group([
                    query(':enter', [
                        animate('0.5s ease-in-out', style({ transform: 'translateX(0%)' })),
                    ], { optional: true }),
                    query(':leave', [
                        animate('0.5s ease-in-out', style({ transform: 'translateX(-100%)' }))
                    ], { optional: true })
                ]),
                animate('0.1s ease-in-out', style({ 'opacity': '1' })),
                query('.footer', style({ 'visibility': 'visible' }))
            ]),
        ]),

        transition('about-me => home, color-test => about-me, color-test => home', [
            query(':enter, :leave', style({ position: 'fixed', width: '100%' }), { optional: true }),
            sequence([
                group([
                    query(':enter', [
                        style({ transform: 'translateX(-100%)' }),
                    ], { optional: true }),
                    query(':leave', [
                        style({ transform: 'translateX(0%)' }),
                    ], { optional: true })
                ]),
                style({ 'opacity': '1' }),
                query('.footer', style({ 'visibility': 'collapse' })),
                query('.footer,#content', animate('0.1s ease-in-out', style({ 'opacity': '0.2' }))),
                group([
                    query(':enter', [
                        animate('0.5s ease-in-out', style({ transform: 'translateX(0%)' })),
                    ], { optional: true }),
                    query(':leave', [
                        animate('0.5s ease-in-out', style({ transform: 'translateX(100%)' }))
                    ], { optional: true })
                ]),
                animate('0.1s ease-in-out', style({ 'opacity': '1' })),
                query('.footer', style({ 'visibility': 'visible' }))
            ]),
        ])
    ]);