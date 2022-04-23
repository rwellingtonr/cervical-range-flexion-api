export interface ICRUDRepo<T> {
	create(data: T): Promise<T>
	findOne(id: string): Promise<T>
	exists(name: string): Promise<boolean>
	delete(id: string): Promise<boolean>
	update(id: string, data: T): Promise<T>
}

export interface IPatientDataRepo {}
