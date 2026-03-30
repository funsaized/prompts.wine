---
title: "LangChain Handoffs"
source: "https://docs.langchain.com/oss/python/langchain/multi-agent/handoffs"
category: "workflows"
tags:
  - multi-agent
  - langchain
  - langgraph
  - handoffs
  - state-management
---

# Handoffs

In the handoffs architecture, behavior changes dynamically based on state. The core mechanism: tools update a state variable (e.g., `current_step` or `active_agent`) that persists across turns, and the system reads this variable to adjust behavior—either applying different configuration (system prompt, tools) or routing to a different agent.

The term "handoffs" was coined by OpenAI for using tool calls (e.g., `transfer_to_sales_agent`) to transfer control between agents or states.

## Key characteristics

- **State-driven behavior**: Behavior changes based on a state variable
- **Tool-based transitions**: Tools update the state variable to move between states
- **Direct user interaction**: Each state's configuration handles user messages directly
- **Persistent state**: State survives across conversation turns

## When to Use

Use the handoffs pattern when you need to enforce sequential constraints (unlock capabilities only after preconditions are met), the agent needs to converse directly with the user across different states, or you're building multi-stage conversational flows. This pattern is particularly valuable for customer support scenarios where you need to collect information in a specific sequence.

## Basic Implementation

The core mechanism is a tool that returns a `Command` to update state, triggering a transition to a new step or agent:

```python
from langchain.tools import tool
from langchain.messages import ToolMessage
from langgraph.types import Command

@tool
def transfer_to_specialist(runtime) -> Command:
    """Transfer to the specialist agent."""
    return Command(
        update={
            "messages": [
                ToolMessage(
                    content="Transferred to specialist",
                    tool_call_id=runtime.tool_call_id
                )
            ],
            "current_step": "specialist"  # Triggers behavior change
        }
    )
```

## Implementation Approaches

There are two ways to implement handoffs: **single agent with middleware** (one agent with dynamic configuration) or **multiple agent subgraphs** (distinct agents as graph nodes).

### Single Agent with Middleware

A single agent changes its behavior based on state. Middleware intercepts each model call and dynamically adjusts the system prompt and available tools. Tools update the state variable to trigger transitions.

```python
from langchain.agents import AgentState, create_agent
from langchain.agents.middleware import wrap_model_call

class SupportState(AgentState):
    current_step: str = "triage"
    warranty_status: str | None = None

@wrap_model_call
def apply_step_config(request, handler):
    step = request.state.get("current_step", "triage")
    configs = {
        "triage": {"prompt": "Collect warranty information...", "tools": [...]},
        "specialist": {"prompt": "Provide solutions based on warranty...", "tools": [...]}
    }
    config = configs[step]
    request = request.override(
        system_prompt=config["prompt"].format(**request.state),
        tools=config["tools"]
    )
    return handler(request)
```

### Multiple Agent Subgraphs

Multiple distinct agents exist as separate nodes in a graph. Handoff tools navigate between agent nodes using `Command.PARENT` to specify which node to execute next.

```python
@tool
def transfer_to_sales(runtime: ToolRuntime) -> Command:
    last_ai_message = next(
        msg for msg in reversed(runtime.state["messages"]) if isinstance(msg, AIMessage)
    )
    transfer_message = ToolMessage(
        content="Transferred to sales agent",
        tool_call_id=runtime.tool_call_id,
    )
    return Command(
        goto="sales_agent",
        update={
            "active_agent": "sales_agent",
            "messages": [last_ai_message, transfer_message],
        },
        graph=Command.PARENT
    )
```

## Context Engineering

With subgraph handoffs, you control exactly what messages flow between agents. When handing off between agents, you must include both:
1. The `AIMessage` containing the tool call that triggered the handoff
2. A `ToolMessage` acknowledging the handoff

**Why not pass all subagent messages?** The receiving agent may become confused by irrelevant internal reasoning, and token costs increase unnecessarily. By passing only the handoff pair, you keep the parent graph's context focused on high-level coordination.
