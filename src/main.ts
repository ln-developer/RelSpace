import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {AppModule} from './app/app.module';

import { registerLocaleData } from '@angular/common';
import ruLocale from '@angular/common/locales/ru';

registerLocaleData(ruLocale);

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
