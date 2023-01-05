### Maxwell and Boltzmann
<script>
window.MathJax = {
  tex: {
    tags: 'ams'
  }
};
</script>

I started reading Abraham Pais’ 1982 book, [_Subtle is the Lord: the science and the life of Albert
Einstein_](https://www.goodreads.com/book/show/282459.Subtle_Isthe_Lord) last week. I never took a university level
course in relativity or quantum physics, but I did study some undergraduate math and physics, and right off the bat,
some of the concepts are not exactly intuitive, over 100 years later.

I also failed thermodynamics three times, however. When I was a student I thought this was due to my lack of discipline
and focus (it was), but I once again have enough time on my hands to make a concerted effort to explore the weird
philosophical implications of this topic, even if it defeats me again.

The chapters about Einstein’s life are enlightening and easy to read, and while the “science” chapters are also
enlightening, they are challenging. These chapter titles aren’t italicized in the table of contents, and they constitute
the majority of the book’s contents. I’ve been collecting some notes here as I’ve been reading. It‘s time-consuming,
but I don’t think it makes sense to speed through this stuff;— slowing down seems to help.

There is a monument on Ludwig Boltzmann’s grave, in the Central Cemetery of Vienna, which contains the following
formula:

$$ \begin{equation} S = k \; log \, W \end{equation} $$

Boltzmann never wrote the equation in this form, where $$S$$ is the Entropy of a closed system at thermodynamic
equilibrium, and $$W$$ is the combination of distinct microscopic states available to the system (which he called
_complexions_). In fact, this form of the equation, as well as the constant $$k$$, which carries his name, was first
used by Max Planck in his [formula to describe the spectral density](https://en.wikipedia.org/wiki/Planck%27s_law)
of [Blackbody Radiation](https://en.wikipedia.org/wiki/Ultraviolet_catastrophe):

$$ \begin{equation} \rho(\nu, T) = \frac{8 \pi h \nu^3}{c^3} \frac{1}{e^{h \nu / k T} - 1} \end{equation} $$

The version of this equation that Boltzmann introduced in his 1872 paper also contains what Pais calls the $$H$$
theorem. He defined a quantity called $$H$$ in terms of the velocity distribution of particles in a system, with the
property $$ dH/dT \leq 0 $$, so that $$H$$ can be identified with Entropy. In an important 1877 paper which describes
the Second Law of Thermodynamics, Boltzmann proved that universal increase in Entropy (decrease in $$H$$) cannot be an
absolute law, but a matter of overwhelming probability.

This principle was as sacred to Einstein as the law of Conservation of Energy.

One of Einstein’s insights was to reverse the direction of Boltzmann’s relation between $$S$$ and $$W$$. Instead of
using the probabilities of the microscopic state of the system to determine an expression for Entropy, he suggested
using the Entropy to deduce the probability. In other words, instead of “Boltzmann logic” where $$W \rightarrow S$$, he
introduced “Einstein logic”, where $$S \rightarrow W$$.

He also observed that “neither Herr Boltzmann nor Herr Planck has given a definition of $$W$$.”  While Boltzmann (and
everyone else) considered $$W$$ as the originating concept: the number of different ways of organizing the particles in
a system,— usually an ideal gas, Einstein’s genius allowed him to extend the idea of quantization from ideal gases to
light,— by reversing the direction of causality.

#### Other notes

Boltzmann’s constant $$k$$ is one of the seven ”defining constants“ in the SI system, and since 2011 is no longer
experimentally determined, but instead defined with a value of exactly $$1.380649×10^{−23} \; J/K$$.

Boltzmann provided two definitions of thermodynamic probability for a system of _N_ particles. The first, which Einstein
accepted, was based on the evolution in time of the particles circulating on a 6N-dimensional surface of constant
energy, later called the $$\Gamma$$-space. The second is a counting definition — the combinations of all possible energy
levels for these particles.

Pais wonders about Einstein’s reluctance to accept the _status quo_ on the counting problem, and other concepts widely
accepted in quantum physics. For example, he says that Einstein had subtle ways of expressing his dissatisfaction with
the conventions of quantum physics, for example, in his references to the Wave Function $$\Psi$$ — in German he always
used the mathematical term _die Psifunktion_ instead of the more conventional
_die Wellenfunktion_.

Frank Lambert calls the ”disorder” metaphor to describe Entropy a
“[cracked crutch](https://pubs.acs.org/doi/abs/10.1021/ed079p187).”

_Next: [The Reality of Molecules](/2023/01/04/the-reality-of-molecules/)_


