// Controller for employer (worker) to manage own competencies

export const selfListCompetencies = async (req, res) => {
  try {
    const { WorkerCompetency } = await import('../models/workerCompetency.model.js')
    const items = await WorkerCompetency.find({ worker: req.user.userId })
      .populate('skill', 'name slug')
      .sort({ createdAt: -1 })
    return res.status(200).json({ success: true, data: items })
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Lỗi khi tải hồ sơ năng lực' })
  }
}

// Replace all competencies with provided list
// body: { competencies: [{ skill: ObjectId, level, yearsOfExperience, certifications, notes, status }] }
export const selfSaveCompetencies = async (req, res) => {
  try {
    const { WorkerCompetency } = await import('../models/workerCompetency.model.js')
    const { competencies } = req.body
    if (!Array.isArray(competencies)) {
      return res.status(400).json({ success: false, message: 'competencies phải là mảng' })
    }

    const workerId = req.user.userId

    // Basic validation
    for (const c of competencies) {
      if (!c.skill) return res.status(400).json({ success: false, message: 'Thiếu skill trong một phần tử' })
    }

    // Remove old then insert new (transaction is optional here)
    await WorkerCompetency.deleteMany({ worker: workerId })
    const docs = await WorkerCompetency.insertMany(
      competencies.map(c => ({ ...c, worker: workerId }))
    )

    return res.status(200).json({ success: true, data: docs })
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Lỗi khi lưu hồ sơ năng lực' })
  }
}


