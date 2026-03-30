---
title: "AutoGen Sequential Workflow"
source: "https://microsoft.github.io/autogen/stable/user-guide/core-user-guide/design-patterns/sequential-workflow.html"
category: "workflows"
tags:
  - multi-agent
  - autogen
  - sequential-workflow
  - microsoft
---

# Sequential Workflow

AutoGen supports sequential workflows where multiple agents complete tasks in a predetermined order, with each agent's output feeding into the next agent's input.

## Overview

In a sequential workflow, agents execute one after another. The output from each agent becomes part of the conversation context for the next agent. This pattern is useful when tasks have a natural ordering dependency.

## Basic Pattern

```python
from autogen import ConversableAgent

# Create agents
agent1 = ConversableAgent(
    name="researcher",
    system_message="You research topics and provide detailed summaries.",
    llm_config={"model": "gpt-4"}
)

agent2 = ConversableAgent(
    name="writer",
    system_message="You write clear, concise content based on research summaries.",
    llm_config={"model": "gpt-4"}
)

# Sequential conversation
response1 = agent1.generate_reply(messages=[{"role": "user", "content": "Research AI agents"}])
response2 = agent2.generate_reply(
    messages=[
        {"role": "user", "content": "Research AI agents"},
        {"role": "assistant", "content": response1}
    ]
)
```

## Key Characteristics

- **Ordered execution**: Agents work in sequence, not parallel
- **Chained context**: Output from agent N becomes input to agent N+1
- **Simple to reason about**: Clear data flow and dependency chain
- **Linear token growth**: Context grows with each step

## When to Use

- Tasks with inherent ordering (research → analyze → write → edit)
- When each agent has a distinct, specialized role
- When intermediate outputs need human review before proceeding
- When you need explicit control over execution order

## Variations

**Nested Sequential**: A group chat can be used as one step in a larger sequential pipeline.

**Conditional Sequential**: Include conditional logic between steps to skip or route based on intermediate results.

## Limitations

- Slower than parallel approaches (can't leverage concurrent execution)
- Context length grows linearly with each step
- If one step fails, subsequent steps may fail or operate on incomplete data
- No built-in rollback mechanism
