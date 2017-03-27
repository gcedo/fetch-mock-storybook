import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import fetchMock from 'fetch-mock';

import '../index.css';
import App from '../App';

const payload = {
  JavaScript: 3390991,
  'C++': 44974,
  TypeScript: 15530,
  CoffeeScript: 12253,
  Python: 9383,
  C: 5341,
  Shell: 5115,
  HTML: 3420,
  CSS: 3171,
  Makefile: 189,
};

const rateLimitPayload = {
  message: "API rate limit exceeded for xxx.xxx.xxx.xxx. (But here's the good news: Authenticated requests get a higher rate limit. Check out the documentation for more details.)",
  documentation_url: 'https://developer.github.com/v3/#rate-limiting',
};

storiesOf('App', module)
  .add('success', () => {
    fetchMock
      .restore()
      .getOnce(
        'https://api.github.com/repos/facebook/react/languages',
        payload,
      );
    return <App />;
  })
  .add('with network delay', () => {
    fetchMock
      .restore()
      .getOnce(
        'https://api.github.com/repos/facebook/react/languages',
        new Promise(res => setTimeout(res, 200)).then(
          () => payload,
        ),
      );
    return <App />;
  })
  .add('failure', () => {
    fetchMock
      .restore()
      .getOnce(
        'https://api.github.com/repos/facebook/react/languages',
        {
          status: 403,
          body: rateLimitPayload,
        },
      );
    return <App />;
  });
