const { spawnSync, execSync } = require('child_process')

/**
 * Task model
 *   from taskwarrior
 */
// FIXME: これを定義すると No exports provided になってしまう
// でもクラスにしたほうがいいので使いたい
// class Task {
//   constructor (options) {
//     this.id = options.id
//     this.uuid = options.uuid
//     this.description = options.description || ''
//     this.due = options.due || ''
//     this.entry = options.entry || ''
//     this.modified = options.modified || ''
//     this.end = options.end || ''
//     this.status = options.status || ''
//     this.project = options.project || ''
//     this.priority = options.priority || ''
//     this.tags = options.tags || ''
//     this.urgency = options.urgency || ''
//   }
// }

// module.exports.Task = Task

const compareTask = (a, b) => {
  if (a.status === 'completed' && b.status !== 'completed') {
    return 1
  } else if (a.status !== 'completed' && b.status === 'completed') {
    return -1
  }

  if (a.due < b.due) {
    return -1
  } else if (a.due === b.due) {
    return 0
  } else {
    return 1
  }
}

/**
 * get All Tasks
 *   from `task [filter] export` command
 */
module.exports.getTasks = () => {
  const cmd = spawnSync(
    'task',
    [
      'status:pending',
      'or',
      'status:waiting',
      'or',
      'status:completed',
      'export'
    ]
  )

  if (cmd.stderr.length > 0) {
    throw cmd.stderr.toString()
  }

  const tasksObj = JSON.parse(cmd.stdout.toString()).sort(compareTask)
  return tasksObj

  // return tasksObj.map(taskObj => { return new Task(taskObj) })
}

/**
 * get Latest Task
 *   from `task [filter] export` command
 */
module.exports.getLatestTask = () => {
  const cmd = spawnSync('task', ['+LATEST', 'export'])

  if (cmd.stderr.length > 0) {
    throw cmd.stderr.toString()
  }

  const tasksObj = JSON.parse(
    cmd.stdout.toString()
  )

  return tasksObj
  // return new Task(tasksObj[0])
}

/**
 * add Task
 *   by `task add <mods>` command
 */
module.exports.addTask = (options) => {
  options = options || {}

  const cmd = spawnSync(
    'task',
    [
      'add',
      'due:' + (options.due || ''),
      'project:' + (options.project || ''),
      'priority:' + (options.priority || ''),
      'tags:' + (options.tags || ''),
      options.description
    ]
  )

  if (cmd.stderr.length > 0) {
    throw cmd.stderr.toString()
  }

  return true
}

/**
 * modify Task
 *   by `task <filter> modify <mods>` command
 */
module.exports.modifyTask = (uuid, options) => {
  const cmd = spawnSync(
    'task',
    [
      uuid,
      'modify',
      'due:' + (options.due || ''),
      'project:' + (options.project || ''),
      'priority:' + (options.priority || ''),
      'tags:' + (options.tags || ''),
      options.description
    ]
  )

  if (cmd.stderr.length > 0) {
    throw cmd.stderr.toString()
  }

  return true
}

/**
 * done Task
 *   by `task <filter> done <mods>` command
 */
module.exports.doneTask = uuid => {
  const cmd = spawnSync('task', [uuid, 'done'])
  console.log(cmd)

  return true
}

/**
 * delete Task
 *   by `task <filter> delete <mods>` command
 */
module.exports.deleteTask = uuid => {
  // 先に status を pending にしておかないと削除できないらしい
  const precmd = spawnSync('task', [uuid, 'modify', 'status:pending'])
  console.log(precmd)
  execSync(`yes | task "${uuid}" delete`)

  return true
}
