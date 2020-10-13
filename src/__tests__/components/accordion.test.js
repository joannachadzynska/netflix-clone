import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { Accordion } from '../../components';
import faqsData from '../../fixtures/faqs.json';

describe('<Accordion/>', () => {
	let getByText, queryByText, container;
	beforeEach(() => {
		const component = render(
			<Accordion>
				<Accordion.Title>Frequently Asked Questions</Accordion.Title>
				<Accordion.Frame>
					{faqsData.map((item) => (
						<Accordion.Item key={item.id}>
							<Accordion.Header>{item.header}</Accordion.Header>
							<Accordion.Body>{item.body}</Accordion.Body>
						</Accordion.Item>
					))}
				</Accordion.Frame>
			</Accordion>
		);
		getByText = component.getByText;
		queryByText = component.queryByText;
		container = component.container;
	});

	it('renders the <Accordion /> with populated data', () => {
		expect(getByText('Frequently Asked Questions')).toBeTruthy();
		expect(getByText('What is Netflix?')).toBeTruthy();
		expect(getByText('How much does Netflix cost?')).toBeTruthy();
		expect(getByText('Where can I watch?')).toBeTruthy();
		expect(getByText('How do I cancel?')).toBeTruthy();
		expect(getByText('What can I watch on Netflix?')).toBeTruthy();
		expect(container.firstChild).toMatchSnapshot();
	});

	it('opens and closes the <Accordion /> component', () => {
		const whatIsNetflixBodyText =
			"Netflix is a streaming service that offers a wide variety of award-winning TV programmes, films, anime, documentaries and more – on thousands of internet-connected devices. You can watch as much as you want, whenever you want, without a single advert – all for one low monthly price. There's always something new to discover, and new TV programmes and films are added every week!";

		expect(queryByText(whatIsNetflixBodyText)).toBeFalsy();
		fireEvent.click(queryByText('What is Netflix?'));
		expect(queryByText(whatIsNetflixBodyText)).toBeTruthy();

		fireEvent.click(queryByText('What is Netflix?'));
		expect(queryByText(whatIsNetflixBodyText)).toBeFalsy();
		expect(container.firstChild).toMatchSnapshot();
	});
});