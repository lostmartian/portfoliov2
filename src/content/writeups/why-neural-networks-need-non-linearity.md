---
title: "Why Neural Networks Need Non-Linearity"
date: "NOV 22, 2026"
category: "MACHINE LEARNING"
tags: ["Neural networks", "ReLU", "Activation functions", "Universal approximation", "Interactive"]
description: "An interactive, step-by-step explainer: why stacking linear layers gets you nowhere, how one small bend (ReLU) changes everything, and how adding bends lets a network draw any curve."
---

If you know $y = mx + b$, you already know most of what a neuron does. This writeup builds the rest from there, one idea at a time, with figures you can poke at. By the end you'll know exactly why every neural network has a "non-linearity" in it, and what goes wrong without one.

Prefer to watch? There's a [video version on YouTube](https://www.youtube.com/watch?v=5cpgl3UMOXc).

## Can you draw one line?

Here's a puzzle. Four points sit on the corners of a square. Two are filled: $(0, 0)$ and $(1, 1)$. Two are rings: $(0, 1)$ and $(1, 0)$.

Your job: draw **one straight line** that puts all the filled dots on one side and all the rings on the other.

<nn-demo kind="xor-line"></nn-demo>

Go on, try every angle. It can't be done. Whichever way you tilt the line, at least one point ends up on the wrong side.

This pattern is called **XOR** ("exclusive or": the answer is 1 when exactly one input is 1). It's tiny, but it's famous, because it shows the limit of straight lines.

No single straight line can do this. Neither can a neural network without non-linearity. Let's see why.

## What a neuron computes

A neuron takes some numbers in, multiplies each one by a **weight**, adds them up, and adds one more number called the **bias**:

$$
z = w_1x_1 + w_2x_2 + w_3x_3 + b
$$

A concrete example. With inputs $x_1 = 2$, $x_2 = 1$, $x_3 = 0$, weights $w_1 = 0.5$, $w_2 = -1$, $w_3 = 3$ and bias $b = 1$:

$$
z = 0.5 \cdot 2 + (-1) \cdot 1 + 3 \cdot 0 + 1 = 1
$$

The weights say how much each input matters. The bias shifts the result up or down. In short, this is $z = w \cdot x + b$: a **weighted sum plus a bias**.

With a single input, that's literally $z = wx + b$, the equation of a line. Play with it:

<nn-demo kind="neuron"></nn-demo>

The weight tilts the line. The bias slides it up and down. But no matter what you do, it stays perfectly straight.

## Stacking linear layers collapses into one

"Fine," you might say, "one neuron is a line. But a neural network has *many layers*. Surely stacking them gives you something more powerful?"

Let's test that with real numbers. Take two layers:

- Layer 1: $h = 3x + 1$
- Layer 2: $y = 2h + 5$

Now substitute the first into the second:

<nn-demo kind="collapse-algebra"></nn-demo>

Two layers went in. One line came out: $y = 6x + 7$. You could have written that as a single layer from the start.

The same thing happens with layers of any width. With weight matrices $W_1, W_2$ and bias vectors $b_1, b_2$:

$$
y = W_2(W_1x + b_1) + b_2 = (W_2W_1)\,x + (W_2b_1 + b_2) = W'x + b'
$$

Multiplying two matrices gives another matrix, so the whole thing is one layer with weights $W'$ and bias $b'$. Try stacking more:

<nn-demo kind="collapse-layers"></nn-demo>

Ten layers, still one line. Without something extra, depth is an illusion: a 100-layer linear network is exactly as powerful as a 1-layer one.

## Solving XOR with ReLU

The "something extra" can be astonishingly simple. Meet **ReLU** (rectified linear unit):

$$
\mathrm{ReLU}(z) = \max(0, z)
$$

That's it: if $z$ is positive, keep it; if it's negative, replace it with 0. So $\mathrm{ReLU}(3) = 3$ and $\mathrm{ReLU}(-1) = 0$.

Now a tiny network with two hidden neurons:

$$
h_1 = \mathrm{ReLU}(x_1 + x_2), \qquad h_2 = \mathrm{ReLU}(x_1 + x_2 - 1), \qquad y = h_1 - 2h_2
$$

Run all four XOR points through it:

| Input $(x_1, x_2)$ | $h_1$ | $h_2$ | $y$ |
| :----------------: | :---: | :---: | :-: |
| $(0, 0)$           | 0     | 0     | 0   |
| $(0, 1)$           | 1     | 0     | 1   |
| $(1, 0)$           | 1     | 0     | 1   |
| $(1, 1)$           | 2     | 1     | 0   |

Exactly XOR. Look closely at the first row. For $(0, 0)$, the second neuron computes $0 + 0 - 1 = -1$, and ReLU **clips it to 0**. That single clip is what stops the layers collapsing: without it, $h_2$ would be $-1$, and the whole network would simplify back into one line.

Here's what's happening geometrically. The hidden layer *moves* the points to new positions $(h_1, h_2)$, and there, one straight line separates them:

<nn-demo kind="xor-relu"></nn-demo>

The network didn't learn to draw a curved boundary. It learned to rearrange the points so a straight boundary works.

## ReLU as a hinge

To see what ReLU really adds, look at one neuron on its own: $a \cdot \mathrm{ReLU}(x - b)$.

It's flat (zero) until $x = b$, then it rises in a straight line with slope $a$. Think of a **hinge**: a door that's closed up to a point, then swings open.

<nn-demo kind="hinge"></nn-demo>

Two numbers control the hinge:

- $b$ says **where** the bend is.
- $a$ says **how much** the slope changes at the bend.

One hinge isn't much. But you can add hinges together, and that's where it gets interesting.

## Adding hinges to build a curve

Let's build a curve that no straight line could ever match: $y = x^2$, between 0 and 3.

The plan: approximate it with straight pieces, one piece per unit of $x$. The slope of $x^2$ between 0 and 1 is about 1, between 1 and 2 about 3, and between 2 and 3 about 5. So we need a line whose slope is 1, then 3, then 5.

Each hinge adds to the slope from its bend onwards. So:

- A hinge at 0 with weight **1** gives slope 1.
- A hinge at 1 with weight **2** bumps the slope from 1 to 3.
- A hinge at 2 with weight **2** bumps it from 3 to 5.

**Each output weight is the change in slope at that neuron's bend.** The network:

$$
h_1 = \mathrm{ReLU}(x), \quad h_2 = \mathrm{ReLU}(x - 1), \quad h_3 = \mathrm{ReLU}(x - 2), \quad y = 1 \cdot h_1 + 2 \cdot h_2 + 2 \cdot h_3
$$

How close does it get?

| $x$  | Network | True $x^2$ | Error |
| ---: | ------: | ---------: | ----: |
| 0.5  | 0.5     | 0.25       | 0.25  |
| 1    | 1       | 1          | 0     |
| 1.5  | 2.5     | 2.25       | 0.25  |
| 2    | 4       | 4          | 0     |
| 2.5  | 6.5     | 6.25       | 0.25  |
| 3    | 9       | 9          | 0     |

Exact at the bends, and never more than 0.25 off in between. Run the network yourself; the table under the plot does the forward pass for whatever $x$ you pick:

<nn-demo kind="curve"></nn-demo>

Switch to 6 neurons, with bends at 0, 0.5, 1, 1.5, 2 and 2.5 and output weights 0.5, 1, 1, 1, 1, 1. The maximum error drops to about **0.0625**. Halving the spacing between bends *quarters* the error, because each straight piece is shorter and hugs the curve more tightly.

## Universal approximation

Nothing in that recipe was special to $x^2$. To copy any smooth curve, put bends close together and set each weight to the change in slope there. With enough neurons you can get as close as you like to essentially **any continuous curve**. This is the idea behind the *universal approximation theorem*.

Curves that go **down** need the slope to decrease, so some weights become negative. Try $\sin x$ and watch the count of negative weights, or draw your own curve:

<nn-demo kind="universal"></nn-demo>

Notice the step function: no finite number of straight pieces can make a perfect vertical jump, but more neurons make the ramp steeper and steeper.

## The geometric view: folding space

There's another way to picture all this, with more than one input. Think of the inputs as a sheet of graph paper.

A **linear layer** can stretch, squash, rotate and shift the sheet, but straight lines stay straight and parallel lines stay parallel. A **ReLU** takes every point with a negative coordinate and pushes it onto the axis: it *folds* the paper.

<nn-demo kind="fold"></nn-demo>

Stack a few of these stretch-and-fold steps and you can crumple the input space into almost any shape, which is how a deep network pulls apart classes that started out tangled, like our XOR points.

## Choosing an activation function

ReLU isn't the only option. These are the common ones:

| Activation | Formula | Notes |
| :--------- | :------ | :---- |
| ReLU | $\max(0, z)$ | Simple, fast, the default in most networks |
| Leaky ReLU | $z$ if $z > 0$, else $0.1z$ | Keeps a small slope for negatives, so neurons can't "die" |
| GELU | $z \cdot \Phi(z)$ | A smooth ReLU, used in transformers like GPT and BERT |
| Sigmoid | $\frac{1}{1 + e^{-z}}$ | Squashes to (0, 1); common for probabilities at the output |
| tanh | $\tanh(z)$ | Squashes to (−1, 1) |

Any good activation needs three things:

1. **It must be non-linear.** $f(z) = 5z$ looks like a function, but it's linear, so stacked layers still collapse into one.
2. **It should be differentiable almost everywhere,** because training follows the slope (the gradient) downhill. ReLU's single corner at 0 doesn't cause trouble in practice.
3. **It should keep gradients healthy.** If the slope is nearly zero, learning stalls.

That third point is the **vanishing gradient problem**. Turn on the derivative and look at sigmoid and tanh far from the middle:

<nn-demo kind="activations"></nn-demo>

Their slopes flatten to almost nothing. Multiply many tiny slopes together across many layers, and the signal that tells early layers how to improve fades away. ReLU's slope is exactly 1 for every positive input, which is a big reason it took over.

## Summary

1. A neuron computes a weighted sum plus a bias: a straight line (or flat plane).
2. Stacking linear layers always collapses into a single linear layer: $y = W'x + b'$.
3. That's why no linear network, however deep, can solve XOR.
4. A non-linearity like ReLU clips values, and that clipping blocks the collapse.
5. Each ReLU neuron is a hinge; adding hinges builds any curve, with error shrinking as bends get closer.
6. Linear layers stretch and rotate space; non-linearities bend and fold it.
