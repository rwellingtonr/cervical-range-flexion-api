export interface ICRUDRepo<T> {
	create(data: T): Promise<T>
	findById(id: string): Promise<T>
	findOne(name: string): Promise<T>
	delete(id: string): Promise<boolean>
	update(id: string, data: T): Promise<T>
}

export interface IPatientDataRepo {}
