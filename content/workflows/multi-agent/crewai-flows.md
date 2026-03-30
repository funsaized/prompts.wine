---
title: "CrewAI Flows"
source: "https://docs.crewai.com/en/concepts/flows"
category: "workflows"
tags:
  - multi-agent
  - crewai
  - flows
  - state-management
  - orchestration
---

# Flows

Flows is CrewAI's approach to building multi-agent workflows with state management. A Flow acts as an orchestrator that coordinates multiple crews and agents toward completing complex tasks. Flows provide a programmatic way to chain agents together, manage state across steps, and handle iterative refinement.

## Key Concepts

**Flow Structure**
A Flow is composed of work units that can include one or more crews. Each work unit defines a specific task or set of tasks that agents will execute. Flows allow you to sequence, parallelize, and conditionally route work between these units.

**State Management**
Flows maintain state across execution steps. This means data produced in one step (a work unit) is available to subsequent steps. State is stored in a shared dictionary that agents can read from and write to.

**Kickoff**
The `kickoff()` method starts the flow execution. You can pass initial inputs as a dictionary, and the flow will process them through its defined work units.

**Results**
Flows return structured outputs that include the final state, all intermediate results, and execution metadata.

## Creating a Flow

```python
from crewai.flow.flow import Flow, listen, start

class MyFlow(Flow):
    @start()
    def generate_topic(self):
        # First work unit - generate a topic
        result = some_agent.kickoff()
        return result

    @listen(generate_topic)
    def write_content(self, topic):
        # Second work unit - write content based on topic
        result = another_agent.kickoff(inputs={"topic": topic})
        return result
```

## Flow Methods

- **`@start()`** - Decorator marks the entry point of a flow
- **`@listen()`** - Decorator connects a work unit to listen for output from another unit
- **`kickoff()`** - Executes the flow from the start
- **`kickoff_for_each()`** - Executes the flow for each item in an input list

## Use Cases

- Sequential content pipelines (topic → research → write → edit)
- Parallel content generation with aggregation
- Iterative refinement loops
- Multi-stage data processing pipelines
