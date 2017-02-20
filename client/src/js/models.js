// RequirementsModel


const LAYER_STRATEGY = 'strategy';
const LAYER_BUSINESS = 'business';
const LAYER_IT = 'it';

const LAYERS = [
  {id: LAYER_STRATEGY, name: '戦略要求'},
  {id: LAYER_BUSINESS, name: '業務要求'},
  {id: LAYER_IT, name: 'IT要求'}
];

const PRIORITIES_LOW = 'low';
const PRIORITIES_MIDDLE = 'middle';
const PRIORITIES_HIGH_MIDDLE = 'high_middle';
const PRIORITIES_HIGH = 'high';

const PRIORITIES = [
  {id: PRIORITIES_LOW, name: '重要度（低）'},
  {id: PRIORITIES_MIDDLE, name: '重要度（中）'},
  {id: PRIORITIES_HIGH_MIDDLE, name: '重要度（高）優先度（中）'},
  {id: PRIORITIES_HIGH, name: '重要度（高）優先度（高）'}
];


const BASE_FIELDS = [
  {model: 'note',
   type: 'textArea',
   label: 'ノート'}
];

const REQUIREMENT_FIELDS = [
  {model: 'layer',
   type: 'select',
   label: '要求レイヤー',
   values: LAYERS},
  {model: 'priority',
   type: 'select',
   label: '優先度',
   values: PRIORITIES}
].concat(BASE_FIELDS);


function makeSchema(fields) {
  // Make schema object for vue-form-generator
  return {
    fields: fields
  };
}


class Node {
  constructor() {
    this.parent = null;
    this.children = [];

    this.note = '';
  }

  addChild(child) {
    this.children.push(child);
    child.parent = this;
    return this;
  }

  removeChild(child) {
    child.parent = null;
    this.children.splice(this.children.indexOf(child), 1);
  }

  removeFromParent() {
    if (this.parent) {
      this.parent.removeChild(this);
    }
  }

  hasChild() {
    return this.children.length > 0;
  }

  hasParent() {
    return this.parent;
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
    this.layer = null;
    this.priority = null;
    this.body = body;
  }
}

class Requirement extends BaseRequirementNode {
  constructor(body) {
    super(body);
  }

  get schema() {
    return makeSchema([
      {
        model: "body",
        type: "textArea",
        label: "内容"
      }
    ].concat(REQUIREMENT_FIELDS));
  }
}

// ValueDesign

class Vision extends BaseRequirementNode {
  constructor(body) {
    super(body);
  }

  get schema() {
    return makeSchema([
      {
        model: "body",
        type: "textArea",
        label: "内容"
      }
    ].concat(REQUIREMENT_FIELDS));
  }
}

class Concept extends BaseRequirementNode {
  constructor(body) {
    super(body);
  }

  get schema() {
    return makeSchema([
      {
        model: "body",
        type: "textArea",
        label: "内容"
      }
    ].concat(REQUIREMENT_FIELDS));
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

const DEMAND_TYPE_NEGATIVE = 'negative';
const DEMAND_TYPE_POSITIVE = 'positive';

const DEMAND_TYPE = [
  {id: DEMAND_TYPE_NEGATIVE, name: "否定"},
  {id: DEMAND_TYPE_POSITIVE, name: "肯定"}
];


class Demand {
  constructor(body, type) {
    this.stakeholder = null;
    this.body = body;
    this.type = type;
  }

  get schema() {
    return makeSchema([
      {
        model: "body",
        type: "textArea",
        label: "内容"
      },
      {
        model: "type",
        type: "select",
        label: "肯定/否定",
        values: DEMAND_TYPE
      }
    ].concat(BASE_FIELDS));
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

  get schema() {
    return makeSchema([
      {
        model: "name",
        type: "input",
        label: "名前"
      }
    ].concat(BASE_FIELDS));
  }
}

// ValueAnalysisModel

class Purpose extends BaseRequirementNode {
  constructor(body, color) {
    super(body);
    this.color = color || '#888';
  }

  get schema() {
    return makeSchema([
      {
        model: "body",
        type: "textArea",
        label: "内容"
      },
      {
        model: "color",
        type: "color",
        label: "色",
        default: "#888"
      }
    ].concat(REQUIREMENT_FIELDS));
  }
}

class Value {
  constructor(stakeholder, purpose, body) {
    this.stakeholder = stakeholder;
    this.purpose = purpose || null;
    this.body = body || '';
  }

  get schema() {
    return makeSchema([
      {
        model: "body",
        type: "textArea",
        label: "内容"
      }
    ].concat(BASE_FIELDS));
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
