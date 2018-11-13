import { autoinject } from 'aurelia-framework';
import { Developer } from './data/developer-models';
import { dispatchify, connectTo } from 'aurelia-store'
import {loadAllDevs, loadJuniorDevs, loadProDevs } from './data/developer-actions';
import { DeveloperState } from './data/developer-models';
import { pluck } from "rxjs/operators";

/*
 * a classic dumb component, all if its actions are passed in
 * and directly called from within the template
 */
@autoinject()
@connectTo<DeveloperState>({
  selector: { developers: (store) => store.state.pipe(pluck("developers")) }
})
export class ListDevelopers {
  // the loaded developers are passed in as inputs
  public developers: Developer[];

  // actions are passed in as inputs
  public loadAllDevs: () => Promise<void> = dispatchify(loadAllDevs)
  public loadProDevs: () => Promise<void> = dispatchify(loadProDevs)
  public loadJuniorDevs: () => Promise<void> = dispatchify(loadJuniorDevs)

  // no need for the store since this is a dumb component
  constructor() {}
}
