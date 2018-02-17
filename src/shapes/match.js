import { shape, string } from 'prop-types';

export const election = shape({
  params: shape({
    electionId: string,
  }),
});

export const unit = shape({
  params: shape({
    unitId: string,
  }),
});

export const candidate = shape({
  params: shape({
    candidateId: string,
  }),
});

export const register = shape({
  params: shape({
    type: string,
  }),
});
