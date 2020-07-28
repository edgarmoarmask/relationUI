import {Compiler, ComponentFactory, Injectable, Injector, NgModuleRef} from '@angular/core';

@Injectable({
  providedIn: 'any'
})
export class ModuleLoaderService {

  constructor(
    private compiler: Compiler,
    private injector: Injector
  ) {
  }

  async loadModule(module: any): Promise<NgModuleRef<any>> {

    const moduleFactory = await this.compiler.compileModuleAsync(module);
    const moduleRef = moduleFactory.create(this.injector);

    return moduleRef;
  }

  async createComponentFactoryByModule(module: any, component: any): Promise<ComponentFactory<any>> {

    const moduleRef = await this.loadModule(module);
    const factory = moduleRef.componentFactoryResolver.resolveComponentFactory(component);

    return factory;
  }
}
