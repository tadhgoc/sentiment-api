function ParamMissingError(id) {
    this.message = id ? `Param ${id} is required` : 'Invalid request';
    this.status = 400;
}

ParamMissingError.prototype = Object.create(Error.prototype);
ParamMissingError.prototype.constructor = ParamMissingError;

export default ParamMissingError;
