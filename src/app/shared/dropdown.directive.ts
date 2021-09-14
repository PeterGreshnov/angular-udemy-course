import { Directive, ElementRef, HostListener, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective implements OnInit {
  dropdownClosed: boolean = true;

  ngOnInit() {
    if (this.dropdownClosed) {
    this.renderer.removeClass(this.elRef.nativeElement, 'open');
    }
  }

  constructor(private elRef: ElementRef, private renderer: Renderer2) { }

  @HostListener('document:click',['$event']) toggleOpen(eventData: Event) {
    if (this.dropdownClosed && this.elRef.nativeElement.contains(eventData.target)) {
      this.dropdownClosed = !this.dropdownClosed;
      this.renderer.addClass(this.elRef.nativeElement, 'open');
  } else {
    this.dropdownClosed = true;
    this.renderer.removeClass(this.elRef.nativeElement, 'open');
  }
  }
}
