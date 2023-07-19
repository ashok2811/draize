import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})

export class ChartComponent implements AfterViewInit {
  @ViewChild('draggableBox', { static: false }) draggableBoxRef!: ElementRef;
  private resizing:boolean = false;

  ngAfterViewInit(): void {
    this.makeDraggable(this.draggableBoxRef.nativeElement);
  }

  // Function to make the box draggable
  private makeDraggable(element: HTMLElement) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    element.onmousedown = dragMouseDown;

    function dragMouseDown(e: MouseEvent) {
      e = e || window.event as MouseEvent;
      e.preventDefault();
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      document.onmousemove = elementDrag;
    }

    const elementDrag = (e: MouseEvent) => {
      e = e || window.event as MouseEvent;
      e.preventDefault();
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      
      if(this.resizing) return;
      element.style.top = (element.offsetTop - pos2) + "px";
      element.style.left = (element.offsetLeft - pos1) + "px";
      element.style.zIndex = "10000";

    }

    function closeDragElement() {
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }

  initResize(e: MouseEvent) {
    e.preventDefault();
    this.resizing = true;
    const element = this.draggableBoxRef.nativeElement;
    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = element.offsetWidth;
    const startHeight = element.offsetHeight;
  
    const handleResize = (e: MouseEvent) => {
      if (!this.resizing) return;
      const width = startWidth + (e.clientX - startX);
      const height = startHeight + (e.clientY - startY);
      element.style.width = width + 'px';
      element.style.height = height + 'px';
    };
  
    const stopResize = () => {
      window.removeEventListener('mousemove', handleResize, false);
      window.removeEventListener('mouseup', stopResize, false);
      this.resizing = false;
    };
  
    window.addEventListener('mousemove', handleResize, false);
    window.addEventListener('mouseup', stopResize, false);
  }
  
}
