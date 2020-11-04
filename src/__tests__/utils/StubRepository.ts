type Entity = { [key: string]: number; }

class StubRepository<Model extends Entity> {
  private data: Map<number, Model>;
  private idFieldName: string;

  constructor(idFieldName: string) {
    this.idFieldName = idFieldName;
    this.data = new Map();
  }

  public async save(entity: Model | Model[]): Promise<Model | Model[]> {
    if (Array.isArray(entity)) {
      entity.forEach(it => this.store(it));
    } else {
      this.store(entity);
    }
    return entity;
  }

  public async remove(entity: Model): Promise<Model> {
    const id = this.getIdFrom(entity);
    if (!id) {
      return entity;
    }
    if (!this.data.has(id)) {
      throw new Error(`Could not find any entity of type "Stub" matching: ${id}`);
    }
    this.data.delete(id);
    return entity;
  }

  public async findOne(searchParams: number | Partial<Model>): Promise<Model | undefined> {
    if (searchParams === null || !searchParams) {
      throw new Error('Invalid search params')
    }
    if (typeof searchParams === 'object') {
      return this.listAllData()
        .find(it => {
          const searchingParamsKeys = Object.keys(searchParams);
          const foundInEntityParams = searchingParamsKeys.filter(key => searchParams[key] === it[key]);
          return foundInEntityParams.length === searchingParamsKeys.length;
        })
    } else if (typeof searchParams === 'number') {
      return this.data.get(searchParams);
    }
  }



  public async findOneOrFail(searchParams: number | Partial<Model>): Promise<Model> {
    const searchResult = await this.findOne(searchParams);
    if (!searchResult)  {
      throw new Error(`Could not find any entity of type "Stub" matching: ${JSON.stringify(searchParams)}`);
    }
    return searchResult;
  }

  public async find(): Promise<Model[]> {
    return this.listAllData();
  }

  private listAllData(): Model[] {
    const list: Model[] = [];
    for (const [id] of this.data) {
      list.push(this.data.get(id)!);
    }
    return list;
  }

  private store(entity: Model): void {
    const entityId = this.getIdFrom(entity);
    if (entityId && this.data.has(entityId)) {
      const stored = this.data.get(entityId);
      entity = { ...stored, ...entity };
      this.data.set(entityId, entity);
    } else {
      const newId = this.generateNumericId();
      this.setIdTo(entity, newId);
      this.data.set(newId, entity);
    }
  }

  private setIdTo(entity: Model, id: number): void {
    (entity as any)[this.idFieldName] = id;
  }

  private getIdFrom(entity: Model): number | undefined {
    return entity[this.idFieldName];
  }

  private generateNumericId(): number {
    return Math.floor(Math.random() * Math.floor(10000));
  }
}

export { StubRepository };
