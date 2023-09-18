interface Identifiable {
    id: Number
}

export abstract class Repository<T extends Identifiable> {
    protected constructor(protected data: {[key: number]: T}) {};
    protected currentId: number = 0;

    public getAll(): T[] {
        return Object.values(this.data);
    }

    public get(id: number): T {
        return this.data[id];
    }

    public insert(entity: T): T {
        entity.id = this.currentId;
        this.data[this.currentId] = entity;
        this.currentId++;
        return entity;
    }

    public update(id: number, updatedEntity: T): T {
        updatedEntity.id = id;
        this.data[id] = updatedEntity;
        return updatedEntity;
    }

    public clear() {
        // TODO: Raise exception if ENV is not test
        this.data = {};
        this.currentId = 0;
    }
}
