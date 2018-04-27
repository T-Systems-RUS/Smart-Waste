export interface IGroup {
  id: string;
  name: string;
  lastUpdated: string;
  owner: string;
  childAssets: {
    references: {
      managedObject: {
        id: string;
        name: string;
      }
    }[]
  }
}

export interface IGroupResponse {
  managedObjects: IGroup[]
}

export interface IGroupChildrenResponse {
  references: {
    managedObject: IGroup
  }[]
}
