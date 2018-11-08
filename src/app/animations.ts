import {animate, group, state, style, transition, trigger} from '@angular/animations';

export const SlideInOutAnimation = [
  trigger('slideInOut', [
    state('void', style({
      'opacity': '0', 'visibility': 'hidden'
    })),
    transition('* => void', [group([
        animate('400ms ease-in-out', style({
          'opacity': '0'
        })),
        animate('400ms ease-in-out', style({
          'visibility': 'hidden'
        }))
      ]
    )]),
    transition('void => *', [group([
        animate('1ms ease-in-out', style({
          'visibility': 'visible'
        })),
        animate('800ms ease-in-out', style({
          'opacity': '1'
        }))
      ]
    )])
  ]),
]
