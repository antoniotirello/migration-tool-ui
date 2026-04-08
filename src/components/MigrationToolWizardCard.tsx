import { Card, Typography } from "antd";
import React from "react";

const { Title, Paragraph } = Typography;

type MigrationToolWizardCardProps = {
    cardTitle: string
    description: string
    icon: React.ElementType
    onClick: () => void
};

export default function MigrationToolWizardCard({
                                                    cardTitle,
                                                    description,
                                                    onClick,
                                                    icon,
                                                }: MigrationToolWizardCardProps) {

    const Icon = icon;

    return (
        <Card
            hoverable
            onClick={onClick}
            style={{
                height: 210,
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                transition: "all 0.2s ease",
            }}
        >
            <div style={{ textAlign: "center" }}>
                <Icon style={{ fontSize: 48 }} />
            </div>

            <Title level={5} style={{ marginBottom: 4, textAlign: "center" }}>
                {cardTitle}
            </Title>

            <Paragraph
                type="secondary"
                style={{ textAlign: "center", width: "100%" }}
            >
                {description}
            </Paragraph>
        </Card>
    );
}
