import { Component, ElementRef, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output, Renderer2, TemplateRef, ViewChild, forwardRef } from '@angular/core';
import { Subject, debounceTime } from 'rxjs';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SharedModule } from './shared.module';
import { StyleClassOptions } from './pipes/pipes/types';

const defultStyle: StyleClassOptions = {
  dropdown_container: '',
  dropdown_form_control: '',
  selectedContainer: '',
  selectedItem: '',
  unselectItem: '',
  placeholder: '',
  dropSymbol: '',
  dropdownMenu: '',
  searchInput: '',
  dropdownItem: ''
}

@Component({
  selector: 'mt-select-dropdown',
  templateUrl: './mt-select-dropdown.component.html',
  styleUrls: ['./mt-select-dropdown.component.scss'],
  standalone: true,
  imports: [CommonModule, SharedModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MtSelectDropdownComponent),
      multi: true
    }
  ]
})
export class MtSelectDropdownComponent implements OnInit, OnDestroy, ControlValueAccessor {
  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;
  @ViewChild('dropdownMenu') dropdownMenu!: ElementRef<HTMLInputElement>;
  @ViewChild('dropdown') dropdown!: ElementRef<HTMLInputElement>;

  @Input() options: any[] = [];
  @Input() compareKey: string = 'id';
  @Input() labelKey: string = 'name';
  @Input() batchLimit!: number;
  @Input() selectedItemTemplet!: TemplateRef<any>;
  @Input() listTemplet!: TemplateRef<any>;
  @Input() willAutoClose: boolean = true;
  @Input() isMultiSelect: boolean = false; // New input to specify multi-select
  @Input() lazyLoading: boolean = false; // New input to enable lazy loading
  @Input() loadingOptions: boolean = false; // Flag to show the loading animation
  @Input() placeholder: string = "Please Select"; // Flag to show the loading animation
  @Input() sCO: StyleClassOptions = {}; // Flag to show the loading animation

  @Output() onSelect = new EventEmitter<any | any[]>(); // Emit the selected value(s)
  @Output() onOpen = new EventEmitter<void>(); // Emit when the dropdown is opened
  @Output() onClose = new EventEmitter<void>(); // Emit when the dropdown is closed
  @Output() onSearch = new EventEmitter<string>(); // Emit the search query
  @Output() loadNext = new EventEmitter<void>(); // Emit to load the next batch of options

  private searchSubject = new Subject<string>();

  dropdownOpen: boolean = false;
  public attachToBody: boolean = false;
  selectedOption: any | any[] = this.isMultiSelect ? [] : null;
  filteredOptions: any[] = [];
  highlightedIndex: number = 0; // Index of the highlighted option
  private blurTimeout: any; // Variable to store the timeout reference
  cancel_Blur_auto_close: boolean = false;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
    // The elementRef will now be available for use within this component.
  }

  ngOnInit(): void {
    this.initOptions()
    if (this.isMultiSelect && !Array.isArray(this.selectedOption)) {
      this.selectedOption = []
    }
    this.registedDomEvent()
    this.searchSubject.pipe(debounceTime(300)).subscribe((query) => {
      this.handleSearch(query)
    })
  }
  initOptions() {
    this.sCO = {
      ...defultStyle,
      ...this.sCO
    }
  }

  onWindowResize(): void {
    this.setDropdownWidth();
    this.adjustDropdownPosition()
  }

  private onChange: any = () => { };
  private onTouched: any = () => { };

  // Write select option to form control
  writeValue(value: any | any[]): void {
    if (this.isMultiSelect) {
      this.selectedOption = value?.length ? value : [];
    } else {
      this.selectedOption = value;
    }
    console.log({ selectedOption: this.selectedOption }, this.isMultiSelect)
    this.emitSelectedValue();
  }

  // Register change callback
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  // Register touched callback
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  // Set the disabled state of the control
  setDisabledState(isDisabled: boolean): void {
    // Add implementation here if needed.
  }




  onScroll(event: any): void {
    if (this.lazyLoading && !this.loadingOptions) {
      if (event.srcElement.scrollTop + event.srcElement.offsetHeight >=
        event.srcElement.scrollHeight) {
        this.loadNext.emit();
        this.loadingOptions = true;
      }
    }
  }

  // Toggle the dropdown visibility
  toggleDropdown(): void {
    this.highlightedIndex = -1;

    console.log("toggel", this.highlightedIndex,)
    this.dropdownOpen = !this.dropdownOpen;
    this.filteredOptions = this.options;
    this.getActiveIndex();
    if (this.dropdownOpen) {
      this.onOpen.emit(); // Emit onOpen event when the dropdown is opened
    } else {
      this.onClose.emit(); // Emit onClose event when the dropdown is closed
    }

    setTimeout(() => {
      this.highlightedIndex = 0;
      if (this.dropdownOpen && this.searchInput) {
        this.searchInput.nativeElement.focus();
        this.onOpenEvents()
        this.adjustDropdownPosition()
        console.log("toggel after", this.highlightedIndex,)
      }
    }, 400)
    this.setDropdownWidth()
    if (this.dropdownOpen && this.lazyLoading) {
      // Emit loadNext event to notify parent component to load more options
      this.loadNext.emit();
    }

  }

  getActiveIndex() {

    if (this.isMultiSelect) {

    } else {
      // fi
    }
    this.filteredOptions
  }

  // Close the dropdown
  closeDropdown(): void {
    clearTimeout(this.blurTimeout);
    this.cancel_Blur_auto_close = false
    this.dropdownOpen = false;
  }

  // Search options based on user input
  handleSearch(query: string): void {
    this.filteredOptions = this.options.filter((option) =>
      option.name.toLowerCase().includes(query.toLowerCase())
    );
    if (query) {
      this.highlightedIndex = 0; // Reset the highlighted index on search
    }
  }

  triggerSearch(event: any) {
    const query = event.target.value
    this.searchSubject.next(query)
  }

  // Move the highlight based on keyboard arrow keys
  moveHighlight(step: number): void {
    if (!this.dropdownOpen) return;
    const newIndex = this.highlightedIndex + step;
    if (newIndex >= 0 && newIndex < this.filteredOptions.length) {
      this.highlightedIndex = newIndex;

    }
  }

  // Handle Enter key press and select the highlighted option
  handleEnterKey(): void {
    if (this.highlightedIndex < this.filteredOptions.length) {
      const selectedOption = this.filteredOptions[this.highlightedIndex];
      this.selectOption(selectedOption);
    } else {
      // If no option is highlighted, open the dropdown on Enter
      this.toggleDropdown();
    }
  }

  // Select an option based on single or multi-select mode
  selectOption(option?: any, isClick: boolean = false): void {
    if (isClick && this.isMultiSelect && this.willAutoClose == false) {
      this.cancel_Blur_auto_close = true
    } else {
      this.cancel_Blur_auto_close = true
    }
    if (this.dropdownOpen) {
      if (this.isMultiSelect && Array.isArray(this.selectedOption)) {
        // Multi-select option
        const index = this.selectedOption.findIndex((item) => item[this.compareKey] == option[this.compareKey])
        if (index === -1) {
          this.selectedOption.push(option);
        } else {
          this.selectedOption.splice(index, 1);
        }
        this.emitSelectedValue();
      } else {
        // Single-select option
        this.selectedOption = option;
        this.dropdownOpen = false;
        this.emitSelectedValue();
      }
    }
  }

  // Unselect an option in multi-select mode
  unselectOption(option: any, event: any): void {
    event?.stopPropagation()
    if (this.isMultiSelect && Array.isArray(this.selectedOption)) {
      this.selectedOption = this.selectedOption.filter((item) => item[this.compareKey] != option[this.compareKey])
      this.emitSelectedValue();
    } else if (this.isMultiSelect == false) {
      this.selectedOption = null
      this.emitSelectedValue();
    }
  }

  // Method to check if all options are selected
  isAllSelected(): boolean {
    return this.selectedOption.length === this.options.length;
  }

  // Method to toggle the "Select All" checkbox
  toggleSelectAll(event: any): void {
    const checked = event?.target?.checked
    if (checked) {
      // Select all options
      this.selectedOption = [...this.options];
    } else {
      // Deselect all options
      this.selectedOption = [];
    }
    this.emitSelectedValue();
  }

  // Method to clear all selected options
  clearAll(): void {
    this.selectedOption = [];
    this.emitSelectedValue();
  }


  // Check if an option is selected in single or multi-select mode
  // isOptionSelected(option: any): boolean {
  //   console.log({ options: this.selectedOption, option, result: (this.selectedOption as any[]).includes(option) })
  //   if ((Array.isArray(this.selectedOption) && !this.selectedOption.length) || !this.selectedOption)
  //     return false
  //   if (this.isMultiSelect) {
  //     return (this.selectedOption as any[]).includes(option);
  //   } else {
  //     return this.selectedOption === option;
  //   }
  // }

  // Check if an option is selected in single or multi-select mode
  isOptionSelected(option: any): boolean {
    if (!this.selectedOption) return false;
    if (this.isMultiSelect) {
      return (this.selectedOption as any[]).some((selected) => selected[this.compareKey] === option[this.compareKey]);
    } else {
      return this.selectedOption[this.compareKey] === option[this.compareKey];
    }
  }

  findIndex() {
    if (this.isMultiSelect) {
      // For multi-select, update highlightedIndex based on the first selected option
      this.highlightedIndex = this.filteredOptions.findIndex(
        (option) => this.selectedOption.some((selected: any) => selected[this.compareKey] === option[this.compareKey])
      );
    } else {
      // For single-select, update highlightedIndex based on the selected option
      this.highlightedIndex = this.filteredOptions.findIndex(
        (option) => option[this.compareKey] === this.selectedOption[this.compareKey]
      );
    }

  }


  // Get the display value for the input field based on single or multi-select mode
  getDisplayValue(): string {
    if (this.selectedOption) {
      if (this.isMultiSelect) {
        return (this.selectedOption as any[]).map((option) => option.name).join(', ');
      } else {
        return this.selectedOption ? this.selectedOption.name : '';
      }
    } else {
      return ''
    }

  }

  // Emit the selected value(s) to the parent component
  private emitSelectedValue(): void {
    this.onSelect.emit(this.isMultiSelect ? this.selectedOption : this.selectedOption);
    if (this.onChange) {
      this.onChange(this.selectedOption);

    }

  }

  registedDomEvent() {
    this.globalClickEvent();
    if (this.isMultiSelect) {
      window.addEventListener('resize', this.onWindowResize.bind(this));
    }
  }

  globalClickEvent() {
    document.addEventListener('click', (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (this.willAutoClose && this.dropdownOpen && !this.elementRef.nativeElement.contains(target)) {
        this.closeDropdown();
      }
    });


  }

  setDropdownWidth(): void {
    if (this.dropdownOpen && this.dropdown && this.isMultiSelect) {
      const customInputWidth = this.dropdown.nativeElement.offsetWidth;
      const dropdownMenu = this.dropdownMenu.nativeElement;
      this.renderer.setStyle(dropdownMenu, 'width', customInputWidth + 'px');
    }
  }

  // Method to adjust the dropdown position based on available space
  adjustDropdownPosition(): void {
    if (this.dropdownOpen && this.attachToBody) {
      const customInput = this.dropdown.nativeElement;
      const dropdownMenu = this.dropdownMenu.nativeElement;

      const customInputRect = customInput.getBoundingClientRect();
      const dropdownMenuHeight = dropdownMenu.offsetHeight;

      const spaceBelow = window.innerHeight - customInputRect.bottom;
      const spaceAbove = customInputRect.top;

      if (spaceBelow < dropdownMenuHeight && spaceAbove >= dropdownMenuHeight) {
        // Not enough space below, but enough space above, position the dropdown above the custom input
        console.log("Place Baove", 'top', `-${dropdownMenuHeight}px`)
        this.renderer.setStyle(dropdownMenu, 'top', `-${dropdownMenuHeight}px`);
      }
    }
  }

  ngOnDestroy(): void {
    // Unsubscribe from the window resize event when the component is destroyed
    if (this.attachToBody) {
      window.removeEventListener('resize', this.onWindowResize.bind(this));
    }
  }


  onOpenEvents() {
    this.searchInput.nativeElement.addEventListener('blur', (event: any) => {
      // Check if the related target is not within the dropdown, and if so, close the dropdown
      const dropdownMenu = this.dropdownMenu.nativeElement;
      const relatedTarget = event.relatedTarget || document.activeElement;
      console.log({ relatedTarget })
      console.log({ event })
      if (!dropdownMenu.contains(relatedTarget as Node)) {
        this.blurTimeout = setTimeout(() => {
          if (this.cancel_Blur_auto_close == false) {
            this.closeDropdown();
            console.log("blur")
          }
        }, 200);
      }
    });

    //   // Attach a mousedown event listener to the dropdown menu
    // this.dropdownMenu.nativeElement.addEventListener('mousedown', (event: MouseEvent) => {
    //   // When the dropdown menu is clicked, clear the blurTimeout to prevent the dropdown from closing
    //   clearTimeout(this.blurTimeout);
    // });

    // // Attach a focus event listener to the search input
    // this.searchInput.nativeElement.addEventListener('focus', () => {
    //   // When the search input is focused, clear the blurTimeout to prevent the dropdown from closing
    //   clearTimeout(this.blurTimeout);
    // });

    // // Attach a blur event listener to the search input
    // this.searchInput.nativeElement.addEventListener('blur', (event: FocusEvent) => {
    //   // Check if the related target is not within the dropdown, and if so, close the dropdown
    //   if (!this.elementRef.nativeElement.contains(event.relatedTarget as Node)) {
    //     this.blurTimeout = setTimeout(() => {
    //       this.closeDropdown();
    //       console.log("blur")
    //     }, 200);
    //   }
    // });

  }
}

