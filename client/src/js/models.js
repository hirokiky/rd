// RequirementsModel

const LAYERS = [
  '戦略要求',
  '業務要求',
  'IT要求',
];

const PRIORITIES = [
  '重要度（低）',
  '重要度（中）',
  '重要度（高）優先度（中）',
  '重要度（高）優先度（高）',
];


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
}

class BaseRequirementNode extends Node {
  constructor(layer, priority, body) {
    super();
    this.layer = layer;
    this.priority = priority;
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
  constructor(layer, priority, body) {
    super(layer, priority, body);
  }
}

class Concept extends BaseRequirementNode {
  constructor(layer, priority, number, body) {
    super(layer, priority, body);
    this.number = number;  // 1, 2, 3のコンセプト
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
  negative: 0,
  positive: 1,
  0: '否定',
  1: '肯定',
};

class Demand {
  constructor(stakeholder, body, type) {
    this.stakeholder = stakeholder;
    this.body = body;
    this.type = type;
  }
}

class Stakeholder extends Node {
  constructor(name) {
    super();
    this.name = name;
    this.demands = []
  }

  addDemand(body, type) {
    this.demands.push(
      new Demand(this, body, type)
    );
    return this;
  }
}

// ValueAnalysisModel

class Purpose extends BaseRequirementNode {
  constructor(layer, priority, body, color) {
    super(layer, priority, body);
    this.color = color;
  }

  get colorCode() {
    return COLORS[this.color];
  }
}

class Value {
  constructor(stakeholder, purpose, body) {
    this.stakeholder = stakeholder;
    this.purpose = purpose;
    this.body = body;
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
