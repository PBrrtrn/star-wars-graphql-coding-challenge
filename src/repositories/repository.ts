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

    public insert(entity: T) {
        entity.id = this.currentId;
        this.data[this.currentId] = entity;
        this.currentId++;
    }

    public clear() {
        // TODO: Raise exception if ENV is not test
        this.data = {};
        this.currentId = 0;
    }
}
