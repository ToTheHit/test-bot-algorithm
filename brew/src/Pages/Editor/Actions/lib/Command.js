class Command {
  constructor(execute, undo) {
    this._execute = execute;
    this._undo = undo;
  }

  execute(engine) {
    this._execute(engine);
  }

  undo(engine) {
    this._undo(engine);
  }
}

export default Command;
