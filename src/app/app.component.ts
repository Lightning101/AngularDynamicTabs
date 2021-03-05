import { ComponentFactoryResolver, OnInit, ViewRef } from '@angular/core';
import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DynamicTabComponent } from './components/dynamic-tab/dynamic-tab.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'DynamicTabs';
  @ViewChild('container', { read: ViewContainerRef, static: true }) dynamicTabPlaceholder: ViewContainerRef;

  tabs = new Map<string, ViewRef>([]);
  newTabCount = 1;
  selectedIndex = 0;
  constructor(private componentFactoryResolver: ComponentFactoryResolver) {

  }
  ngOnInit(): void {
  }


  tabChange(value) {
    if (this.dynamicTabPlaceholder.length > 0)
      this.dynamicTabPlaceholder.detach();
    this.dynamicTabPlaceholder.insert(this.tabs.get(value.tab.textLabel));
    console.log(value);
  }

  addTab() {
    if (this.dynamicTabPlaceholder.length !== 0) {
      this.dynamicTabPlaceholder.detach();
    }

    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(DynamicTabComponent);
    const tabComponetRef = this.dynamicTabPlaceholder.createComponent(componentFactory);
    const instance = tabComponetRef.instance as DynamicTabComponent;
    instance.label = "NewTab" + this.newTabCount;
    instance.index = this.tabs.size - 1;
    instance.deleteTab.subscribe(x => this.deleteTab(x));
    this.tabs.set("NewTab" + this.newTabCount++, this.dynamicTabPlaceholder.get(0));
    this.selectedIndex = this.tabs.size - 1;
  }

  deleteTab(label) {
    if (this.tabs.size === 1)
      return;
    let keys = [...this.tabs.keys()];
    let index = keys.findIndex(key => key === label) - 1;
    if(index === -1)
    {
      index = 0;
      keys.shift();
    }
    this.dynamicTabPlaceholder.clear();
    this.tabs.delete(label);

    this.selectedIndex = index;
    this.dynamicTabPlaceholder.insert(this.tabs.get(keys[index]));



  }

}
