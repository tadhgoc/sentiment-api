function ResourceNotFoundError(id) {
    this.message = id ? `Resource with id ${id} not found` : 'Resource not found';
    this.status = 404;
}

ResourceNotFoundError.prototype = Object.create(Error.prototype);
ResourceNotFoundError.prototype.constructor = ResourceNotFoundError;

export default ResourceNotFoundError;
