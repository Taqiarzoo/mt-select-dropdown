# mt-select-dropdown

> mt-select-dropdown is a versatile and customizable Angular component that provides a dropdown interface for selecting single or multiple options.



## mt-select-dropdown Key Features:

* **Multi-select and Single-select:** Choose between standard dropdown behavior or picking multiple values.
* **Custom Templates:** Utilize custom templates to tailor the appearance of selected options and dropdown items.
* **Lazy Loading:** Improve performance by loading options on demand, especially for large datasets.
* **Search:** Efficiently find options by filtering with a built-in search function.
* **Flexibility:** Fine-tune styling and behaviors with a range of input properties and events.
* **Accessibility:** Ensure inclusive use with appropriate ARIA attributes and keyboard navigation support.


## Installation

```sh
$ npm install mt-select-dropdown

```

## Dependencies

**mt-select-dropdown** requires Bootstrap 5 or above to function properly. It is listed as a peer dependency, so you'll need to install it separately along with `mt-select-dropdown`:

```bash
npm install bootstrap 
```

## Import and Usage:

```tsx
import { Component } from '@angular/core';
import { MtSelectDropdownComponent } from '../../../mt-select-dropdown/src/lib/mt-select-dropdown.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MtSelectDropdownComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'MtSelectDropdown-app';

  selectedOption = [
    { id: 1, name: 'India' },
    { id: 2, name: 'USA' },
    { id: 3, name: 'JAP' },
    { id: 4, name: 'PUK' },
    { id: 5, name: 'RAT' },
    { id: 6, name: 'PAT' },
  ]
}

```

```html
<mt-select-dropdown
  [options]="myOptions"
  [compareKey]="myCompareKey"
  [labelKey]="myLabelKey"
  [badgeLimit]="badgeLimit"
  [selectedItemTemplet]="mySelectedItemTemplet"
  [listTemplet]="myListTemplet"
  [willAutoClose]="myWillAutoClose"
  [isMultiSelect]="myIsMultiSelect"
  [lazyLoading]="myLazyLoading"
  [loadingOptions]="myLoadingOptions" 
  [placeholder]="myPlaceholder"
  (onSelect)="myOnSelect($event)"
  (onOpen)="myOnOpen($event)"
  (onClose)="myOnClose($event)"
  (onSearch)="myOnSearch($event)"
  (loadNext)="myLoadNext($event)"
></mt-select-dropdown>
```

## Authors

* **Mohd Taqi Arzoo** - *Initial work* - [Mohd Taqi](https://github.com/Taqiarzoo)

## License

[MIT License](https://andreasonny.mit-license.org/2019) © Mohd Taqi Arzoo
