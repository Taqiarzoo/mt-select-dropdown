# mt-select-dropdown

> mt-select-dropdown is a versatile and customizable Angular component that provides a dropdown interface for selecting single or multiple options.



## mt-select-dropdown Key Features:

* **Multi-select and Single-select:** Choose between standard dropdown behavior or picking multiple values.
* **Custom Templates:** Utilize custom templates to tailor the appearance of selected options and dropdown items.
* **Lazy Loading:** Improve performance by loading options on demand, especially for large datasets.
* **Search:** Efficiently find options by filtering with a built-in search function.
* **Flexibility:** Fine-tune styling and behaviors with a range of input properties and events.
* **Accessibility:** Ensure inclusive use with appropriate ARIA attributes and keyboard navigation support.




## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

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
import { MtSelectDropdownComponent } from 'mt-select-dropdown';

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

### Serving the app

```sh
$ npm start
```

### Running the tests

```sh
$ npm test
```

### Building a distribution version

```sh
$ npm run build
```

This task will create a distribution version of the project
inside your local `dist/` folder

### Serving the distribution version

```sh
$ npm run serve:dist
```

This will use `lite-server` for servign your already
generated distribution version of the project.

*Note* this requires
[Building a distribution version](#building-a-distribution-version) first.

## API

### useBasicFetch

```js
useBasicFetch(url: string = '', delay: number = 0)
```

Supported options and result fields for the `useBasicFetch` hook are listed below.

#### Options

`url`

| Type | Default value |
| --- | --- |
| string | '' |

If present, the request will be performed as soon as the component is mounted

Example:

```tsx
const MyComponent: React.FC = () => {
  const { data, error, loading } = useBasicFetch('https://api.icndb.com/jokes/random');

  if (error) {
    return <p>Error</p>;
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="App">
      <h2>Chuck Norris Joke of the day</h2>
      {data && data.value && <p>{data.value.joke}</p>}
    </div>
  );
};
```

`delay`

| Type | Default value | Description |
| --- | --- | --- |
| number | 0 | Time in milliseconds |

If present, the request will be delayed by the given amount of time

Example:

```tsx
type Joke = {
  value: {
    id: number;
    joke: string;
  };
};

const MyComponent: React.FC = () => {
  const { data, error, loading } = useBasicFetch<Joke>('https://api.icndb.com/jokes/random', 2000);

  if (error) {
    return <p>Error</p>;
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="App">
      <h2>Chuck Norris Joke of the day</h2>
      {data && data.value && <p>{data.value.joke}</p>}
    </div>
  );
};
```

### fetchData

```js
fetchData(url: string)
```

Perform an asynchronous http request against a given url

```tsx
type Joke = {
  value: {
    id: number;
    joke: string;
  };
};

const ChuckNorrisJokes: React.FC = () => {
  const { data, fetchData, error, loading } = useBasicFetch<Joke>();
  const [jokeId, setJokeId] = useState(1);

  useEffect(() => {
    fetchData(`https://api.icndb.com/jokes/${jokeId}`);
  }, [jokeId, fetchData]);

  const handleNext = () => setJokeId(jokeId + 1);

  if (error) {
    return <p>Error</p>;
  }

  const jokeData = data && data.value;

  return (
    <div className="Comments">
      {loading && <p>Loading...</p>}
      {!loading && jokeData && (
        <div>
          <p>Joke ID: {jokeData.id}</p>
          <p>{jokeData.joke}</p>
        </div>
      )}
      {!loading && jokeData && !jokeData.joke && <p>{jokeData}</p>}
      <button disabled={loading} onClick={handleNext}>
        Next Joke
      </button>
    </div>
  );
};
```

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

1.  Fork it!
2.  Create your feature branch: `git checkout -b my-new-feature`
3.  Add your changes: `git add .`
4.  Commit your changes: `git commit -am 'Add some feature'`
5.  Push to the branch: `git push origin my-new-feature`
6.  Submit a pull request :sunglasses:

## Credits

TODO: Write credits

## Built With

* Dropwizard - Bla bla bla
* Maven - Maybe
* Atom - ergaerga
* Love

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags).

## Authors

* **Mohd Taqi Arzoo** - *All work* - [Mohd Taqi Arzoo](https://taqiarzoo.weebly.com/)

## License

[MIT License](https://andreasonny.mit-license.org/2019) © Mohd Taqi Arzoo
