// RequirementsModel

const LAYERS = [
  '戦略要求',
  '業務要求',
  'IT要求'
];

const PRIORITIES = [
  '重要度（低）',
  '重要度（中）',
  '重要度（高）優先度（中）',
  '重要度（高）優先度（高）'
];


class Node {
  constructor() {
    this.parent = null;
    this.children = [];

    this.editing = false;
  }

  addChild(child) {
    this.children.push(child);
    child.parent = this;
    return this;
  }

  hasChild() {
    return this.children.length > 0;
  }

  flatten() {
    let ret = [this];
    this.children.forEach((child) => {
      ret = ret.concat(child.flatten());
    });
    return ret;
  }
}

class BaseRequirementNode extends Node {
  constructor(body) {
    super();
    this.body = body;
  }
}

class Requirement extends BaseRequirementNode {
  constructor(layer, priority, body) {
    super(layer, priority, body);
  }
}

// ValueDesign

class Vision extends BaseRequirementNode {
  constructor(body) {
    super(body);
  }
}

class Concept extends BaseRequirementNode {
  constructor(body) {
    super(body);
  }
}

class CatchCopy {
  constructor(body) {
    this.body = body;
  }
}

class Meaning {
  constructor(body) {
    this.body = body;
  }
}

class Story {
  constructor(body) {
    this.body = body;
  }
}

class Design {
  constructor(body) {
    this.body = body;
  }
}

// StakeholderModel

const DEMAND_TYPE = {
  unselected: 0,
  negative: 1,
  positive: 2,
  0: '---',
  1: '否定',
  2: '肯定',
};

class Demand {
  constructor(body, type) {
    this.stakeholder = null;
    this.body = body;
    this.type = type;
  }
}

class Stakeholder extends Node {
  constructor(name) {
    super();
    this.name = name;
    this.demands = [];
    this.values = [];
  }

  addDemand(demand) {
    this.demands.push(demand);
    demand.stakeholder = this;
    return this;
  }

  addValue(value) {
    value.stakeholder = this;
    this.values.push(value);
    return this;
  }
}

// ValueAnalysisModel

const COLORS = [
  '#888',
  '#feffa5',
  '#b4dc7f',
  '#596859',
  '#7b886f',
  '#9cfffa',
  '#565676',
  '#aeadf0',
  '#613f75',
  '#ffa0ac',
  '#dab6c4',
];

class Purpose extends BaseRequirementNode {
  constructor(body, color) {
    super(body);
    this.color = color || COLORS[0];
  }
}

class Value {
  constructor(stakeholder, purpose, body) {
    this.stakeholder = stakeholder;
    this.purpose = purpose || null;
    this.body = body || '';
  }
}

// Notes

module.exports = {
  LAYERS: LAYERS,
  PRIORITIES: PRIORITIES,
  BaseRequirementModel: BaseRequirementNode,
  Requirement: Requirement,
  Vision: Vision,
  Concept: Concept,
  CatchCopy: CatchCopy,
  Meaning: Meaning,
  Story: Story,
  Design: Design,
  Stakeholder: Stakeholder,
  DEMAND_TYPE: DEMAND_TYPE,
  Demand: Demand,
  Purpose: Purpose,
  Value: Value
};
